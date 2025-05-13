import kdcData from '@/data/kdc-codes.json';

export type KdcTheme = {
  code: string;
  name: string;
};

export function getKdcThemes(): KdcTheme[] {
  const entry = kdcData[0];
  return Object.entries(entry).map(([code, name]) => ({
    code,
    name,
  }));
}