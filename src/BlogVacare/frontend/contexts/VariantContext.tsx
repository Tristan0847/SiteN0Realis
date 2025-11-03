'use client';
import { SiteVariant } from "@BlogsShared/model/Variant";

import { createContext, useContext, ReactNode } from 'react';

const VariantContext = createContext<SiteVariant>('modern');

/**
 * Fournisseur de variante du site (version rétro, version moderne, ...)
 * @param param0 Paramètres (variants et noeuds enfants du variant)
 * @returns Variants et noeuds enfants
 */
export function VariantProvider({ variant, children }: { variant: SiteVariant; children: ReactNode}) {
  return (
    <VariantContext.Provider value={variant}>
      {children}
    </VariantContext.Provider>
  );
}

/**
 * Hook de récupération de variantes du site
 * @returns Contexte de variantes du site
 */
export function useVariant() {
  return useContext(VariantContext);
}