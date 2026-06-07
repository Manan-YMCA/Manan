import { useNavigate } from "react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateGalleryItem } from "@/hooks/admin";
import { ImageUploadField } from "@/components/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  desc: z.string().trim().min(1, "Description is required"),
  image: z.url("Upload an image first"),
  imagePublicId: z.string(),
});

export function NewGalleryItem() {
  const navigate = useNavigate();
  const create = useCreateGalleryItem();

  const form = useForm({
    defaultValues: { name: "", desc: "", image: "", imagePublicId: "" },
    validators: { onChange: schema },
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
    <div className="max-w-md space-y-6">
      <form
        onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}
        className="space-y-4"
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
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

          <form.Field name="desc">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
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

          <form.Field name="image">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Image</FieldLabel>
                  <ImageUploadField
                    value={field.state.value}
                    onChange={(url, publicId) => {
                      field.handleChange(url);
                      form.setFieldValue("imagePublicId", publicId);
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/gallery")}>
            Cancel
          </Button>
          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting || create.isPending}>
                {create.isPending ? "Creating…" : "Add to gallery"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
