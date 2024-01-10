(function () {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAccessiblyShopify);
  } else {
    initAccessiblyShopify();
  }

  function initAccessiblyShopify() {
    if (typeof window.AccessiblyShopify === 'undefined') {
      /**
       * Constructs a new AccessiblyShopify Analytics tracker.
       *
       * @constructor AccessiblyShopify
       *
       */
      var AccessiblyShopify = function (options) {
        if (!(this instanceof AccessiblyShopify))
          return new AccessiblyShopify(config);

        this.initialize();
      };

      (function (AccessiblyShopify) {
        var Utils = {};

        /**
         * If the element has a srcset attribute, return the srcset attribute, otherwise return the src
         * attribute
         * @param element - The element that we're trying to get the image source from.
         * @returns The image source of the element.
         */
        Utils.getImageSrc = function(element) {
          if (
            element.hasAttribute("srcset") &&
            element.getAttribute("srcset").length > 0 &&
            !element.getAttribute("srcset").startsWith("data:")
            ) {
            return this.getSrcFromSrcset(element)
          }

          if (
            element.hasAttribute("data-srcset") &&
            element.getAttribute("data-srcset").length > 0 &&
            !element.getAttribute("data-srcset").startsWith("data:")
            ) {
            return element.getAttribute("data-srcset")
          }

          return element.getAttribute("src")
        }

        /**
         * It takes an element, gets the srcset attribute, splits it into an array of strings, takes the
         * first string, splits that into an array of strings, and returns the first string
         * @param element - The element that we want to get the src from.
         * @returns The first image in the srcset.
         */
        Utils.getSrcFromSrcset = function (element) {
          const srcset = element.getAttribute("srcset");

          return srcset.split(",")[0].split(" ")[0];
        };

        /**
         * It returns true if the string is a data URL
         * @param src - The source URL of the image.
         * @returns A boolean value.
         */
        Utils.isDataURL = function (src) {
          return !!src.match(
            /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+\=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i
          );
        };

        /**
         * It's removing the query params from the image URL.
         *
         * @param imageUrl
         * @returns
         */
        Utils.getCleanImageUrl = function (imageUrl) {
          if (imageUrl != null) {
            return (
              "https://" + imageUrl.replace(/^(https?:|)\/\//, "").split("?")[0]
            );
          } else {
            return false;
          }
        };

        var AltTags = {};

        AltTags.fetch = function (images) {
          const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              images,
            }),
          };

          return fetch("/apps/otmacessiblyapp/widget/alt-tags", fetchOptions);
        };

        AltTags.query = function (images) {
          const fetchOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pageUrl: window.location.href
            })
          }

          return fetch(
            "/apps/otmacessiblyapp/widget/query-alt-tags",
            fetchOptions
          );
        };

        AltTags.getImages = function () {
          const images = document.images ?? [];
          const imagesMissingAltTags = [];

          for (const image of images) {
            // skip if image has alt tag
            if (
              image.hasAttribute("alt") &&
              image.getAttribute("alt").length > 0
            ) {
              continue;
            }

            let src = Utils.getImageSrc(image);

            // skip if invalid image src
            if (!src) {
              continue;
            }

            const isDataSrc = Utils.isDataURL(src);

            // skip if image src is a data url
            if (isDataSrc) {
              continue;
            }

            src = Utils.getCleanImageUrl(src);

            if (!/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(src)) {
              continue;
            }

            // Add if doesn't exist
            if (
              imagesMissingAltTags.filter((image) => image.src === src)
                .length === 0
            ) {
              imagesMissingAltTags.push({
                src,
                node: image,
                tags: null,
              });
            }
          }

          return imagesMissingAltTags;
        };

        AltTags.append = async function () {
          const images = this.getImages();
          const srcs = images.map((image) => image.src);
          const response = await this.fetch(srcs);

          if (response.ok) {
            const { altTags } = await response.json();

            for (const image of images) {
              const tags = altTags[image.src] ?? null;

              if (tags) {
                image.node.setAttribute("alt", tags);
              }

              image.tags = tags || null;
            }
          }

          return images;
        };
        AccessiblyShopify.prototype.fetchSettings = function () {
          const fetchOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };

          return fetch("/apps/otmacessiblyapp/widget/settings", fetchOptions);
        };

        AccessiblyShopify.prototype.loadWidgetScript = function (callback) {
          const scriptSrc =
            "https://cdn.accessibly.app/accessibility-widget-v2.min.js";

          if (
            !document.querySelectorAll('[src="' + scriptSrc + '"]').length > 0
          ) {
            var script = document.createElement("script");
            script.src = scriptSrc;
            script.async = true;
            script.setAttribute(
              "data-accessibly-shop",
              window.Shopify?.shop ?? null
            );
            script.type = "text/javascript";

            script.onload = callback;
            document.body.appendChild(script);
          }
        };

        AccessiblyShopify.prototype.onload = function () {
          if (!window.Accessibly) {
            throw Error("Unable to load accessibly widget");
          }

          this.widget = window.Accessibly.init(this.options);
        };

        /**
         * Initializes AccessiblyShopify. This is called internally by the constructor and does
         * not need to be called manually.
         */
        AccessiblyShopify.prototype.initialize = async function () {
          try {
            const response = await this.fetchSettings();

            if (response?.ok) {
              const { settings } = await response.json();
              const blockSettings = window.AccessiblyOptions || {};

              this.options = {
                ...settings,
                ...blockSettings,
                ...{
                  enabled: true,
                },
              };

              this.loadWidgetScript(this.onload.bind(this));

              if (this.options.enableFetchAltTags) {
                const images = await AltTags.append();

                const missingImageTags = (images || [])
                  .filter((image) => image.tags === null)
                  .map((image) => image.src);

                AltTags.query(missingImageTags);
              }
            } else {
              console.log(
                `[Accessibly] HTTP Response Code: ${response?.status}`
              );
            }
          } catch (error) {
            console.log("Error initializing AccessiblyShopify");
            console.error(error);
          }
        };

        return AccessiblyShopify;
      })(AccessiblyShopify);
    }

    window.AccessiblyShopify = new AccessiblyShopify();
  }
})();
