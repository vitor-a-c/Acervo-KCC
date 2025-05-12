// src/utils/kdcUtils.ts
import kdcCodes from "@/data/kdc-codes.json";

export const getKdcCategories = () => {
  const mainCategories = new Map<string, string>();
  const subcategories = new Map<string, { code: string; label: string }[]>();

  kdcCodes.forEach((entry) => {
    Object.entries(entry).forEach(([code, label]) => {
      const mainCode = code.substring(0, 1) + "00";

      if (!mainCategories.has(mainCode)) {
        const mainLabel = label
        mainCategories.set(mainCode, mainLabel);
      }

      if (!subcategories.has(mainCode)) {
        subcategories.set(mainCode, []);
      }

      subcategories.get(mainCode)?.push({ code, label });
    });
  });

  return {
    mainCategories: Array.from(mainCategories.entries()).map(([code, name]) => ({
      code,
      name,
    })),
    subcategories,
  };
};
