import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { ClassProp, StringToBoolean } from "class-variance-authority/types";

type ConfigSchema = Record<string, Record<string, ClassValue>>;
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: StringToBoolean<keyof T[Variant]> | null | undefined;
};
type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?:
    | StringToBoolean<keyof T[Variant]>
    | StringToBoolean<keyof T[Variant]>[]
    | undefined;
};
type Config<T> = T extends ConfigSchema
  ? {
      variants?: T;
      defaultVariants?: ConfigVariants<T>;
      compoundVariants?: (T extends ConfigSchema
        ? (ConfigVariants<T> | ConfigVariantsMulti<T>) & ClassProp
        : ClassProp)[];
    }
  : never;
type Props<T> = T extends ConfigSchema
  ? ConfigVariants<T> & ClassProp
  : ClassProp;

export const twClass =
  <T>(base?: ClassValue, config?: Config<T> | undefined) =>
  (props?: Props<T> | undefined) => {
    const result = cva(base, config);
    return twMerge(clsx(result(props)));
  };
