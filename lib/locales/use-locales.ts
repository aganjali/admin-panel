// "use client";

// import type { FlatNamespace } from "i18next";
// import type {} from "react-i18next";

// import { useCallback } from "react";
// import { useTranslation } from "react-i18next";

// import { allLangsObj } from "./all-langs";
// import { fallbackLng, changeLangMessages as messages } from "./config-locales";

// import type { LanguageValue } from "./config-locales";

// // ----------------------------------------------------------------------
// type $Tuple<T> = readonly [T?, ...T[]];

// export function useTranslate<
//   Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined
// >(ns?: Ns) {
//   const router = useRouter();

//   const { t, i18n } = useTranslation<Ns>(ns);
//   const { mutate } = useSWRConfig();

//   const currentLang = allLangsObj[i18n.resolvedLanguage ?? ""];
//   const fallback = allLangsObj[fallbackLng];

//   const onChangeLang = useCallback(
//     async (newLang: LanguageValue) => {
//       try {
//         const langChangePromise = i18n.changeLanguage(newLang);

//         const currentMessages = messages[newLang] || messages.en;

//         toast.promise(langChangePromise, {
//           loading: currentMessages.loading,
//           success: () => currentMessages.success,
//           error: currentMessages.error,
//         });
//         mutate(() => true, undefined, { revalidate: false });
//         router.refresh();
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     [i18n, router, mutate]
//   );

//   return {
//     t,
//     i18n,
//     onChangeLang,
//     currentLang: currentLang ?? fallback,
//     dir: (currentLang ?? fallback).dir,
//   };
// }
