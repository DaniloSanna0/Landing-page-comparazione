import { PrivacyModel } from "@/utils/classes";
//import { privacies } from "@/options/privacies.js";
import { computed } from "vue";
import { useLanding } from "@smart-contact/smartify";

export function usePrivaciesFormSchemas() {
  const landing = useLanding();
  const model = computed(() => {
    const keyword = "privacy";
    const keySymbols = {
      required: "*",
      children: "&",
    };

    const keywordMatchRegexp = new RegExp(
      `^([${keySymbols.required}${keySymbols.children}]+)?(${keyword}(.+))`
    );

    const model = Object.entries(landing.params.get()).reduce(
      (acc, [rawKey, htmlTemplate]) => {
        if (rawKey.match(keywordMatchRegexp) !== null) {
          const keyMatches = rawKey.match(keywordMatchRegexp);
          const [symbols = "", key] = keyMatches ? keyMatches.slice(1) : [];

          if (key) {
            const required = symbols.includes(keySymbols.required);
            const isChildren = symbols.includes(keySymbols.children);

            const currentModel = new PrivacyModel({
              name: key,
              htmlTemplate,
              required,
              isChildren,
            });

            if (isChildren) {
              const parent = acc[acc.length - 1];

              parent.addChildren(currentModel);
            } else {
              acc.push(currentModel);
            }
          }
        }

        return acc;
      },
      []
    );

    return model;
  });

  return { model };
}
