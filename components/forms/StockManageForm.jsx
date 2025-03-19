'use client';

import { ManageStockDialog } from "../dialogs/ManageStockDialog";
import { Button } from "../ui/button";

export default function StockManagesForm({ currencies, revalidate }) {

    return (
        <ManageStockDialog currencies={currencies} revalidate={revalidate}>
            <div className="flex flex-col gap-2 items-center justify-center">
                <h3 className="text-right">ادارة الخزينة</h3>
                <Button >ادارة</Button>
            </div>
        </ManageStockDialog>
    );
}
