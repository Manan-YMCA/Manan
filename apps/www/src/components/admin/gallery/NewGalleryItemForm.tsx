import { useNavigate } from "react-router";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useCreateGalleryItem } from "@/hooks/admin";
import { galleryPayloadSchema } from "@manan/validations";
import { ImageUploadField } from "@/components/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function NewGalleryItemForm() {
  const navigate = useNavigate();
  const create = useCreateGalleryItem();

  const form = useForm({
    defaultValues: { name: "", description: "", imageUrl: "" },
    validators: { onChange: galleryPayloadSchema },
    onSubmit: ({ value }) => {
      create.mutate(value, {
        onSuccess: () => {
          toast.success("Gallery item created");
          navigate("/admin/gallery");
        },
        onError: (e) => toast.error(e.message),
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  placeholder="Event Night 2024"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                  placeholder="A short description"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="imageUrl">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Image</FieldLabel>
                <ImageUploadField
                  value={field.state.value}
                  onChange={(url, publicId) => {
                    field.handleChange(url);
                    void publicId;
                  }}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/gallery")}
        >
          Cancel
        </Button>
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting || create.isPending}
            >
              {create.isPending ? "Creating…" : "Add to gallery"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
