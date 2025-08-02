'use client';

import { useTranslations } from "next-intl";
import { ManageStockDialog } from "../dialogs/ManageStockDialog";
import { Button } from "../ui/button";

export default function StockManagesForm({ currencies, revalidate }) {
    const t = useTranslations('Settings');
    return (
        <ManageStockDialog currencies={currencies} revalidate={revalidate}>
            <div className="flex flex-col gap-2 items-center justify-center">
                <h3 className="text-right">{t('manageVault')}</h3>
                <Button >{t('manage')}</Button>
            </div>
        </ManageStockDialog>
    );
}
