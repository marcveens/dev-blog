import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

type FieldTextareaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  errors?: FieldError;
};

export const FieldTextarea = forwardRef<HTMLTextAreaElement, FieldTextareaProps>((props, ref) => {
  const { label, id, errors, ...inputProps } = props;

  return (
    <>
      <label htmlFor={id} className="block text-sm font-semibold leading-6 text-contrast">
        {label}

        {inputProps.required && (
          <span className="ml-0.5 text-primary" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="mt-2.5">
        <textarea
          className="block w-full rounded-md border-0 bg-contrast/[.05] px-3.5 py-2 text-contrast shadow-sm ring-1 ring-inset ring-contrast/[.2] focus:ring-2 focus:ring-inset focus:ring-contrast/[.5] focus-visible:outline-0 sm:text-sm sm:leading-6"
          id={id}
          rows={4}
          ref={ref}
          {...inputProps}
        />
        {errors && (
          <span className="mt-1 block text-xs text-red-500" role="alert">
            {errors.message || `${label} is required`}
          </span>
        )}
      </div>
    </>
  );
});
