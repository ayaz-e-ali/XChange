import { cn } from "@/lib/utils";

export default function DialogInput({ type = 'text', value, name, className, onChange }) {
    return <input type={type} name={name} value={value} onChange={onChange} className={cn("rounded-md border border-input bg-background px-2 py-1 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className)} />;
}