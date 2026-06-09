import { useNavigate } from "react-router";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { useUpdateProfile } from "@/hooks/use-profile";
import { profileSchema } from "@manan/validations";
import type { Profile } from "@manan/validations";
import { ImageUploadField } from "@/components/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function ProfileForm({ profile }: { profile: Profile }) {
  const navigate = useNavigate();
  const update = useUpdateProfile();

  const form = useForm({
    defaultValues: {
      name: profile.name,
      image: profile.image,
      admissionYear: profile.admissionYear,
      rollNumber: profile.rollNumber,
      graduationYear: profile.graduationYear,
      designation: profile.designation,
      techStack: profile.techStack,
      languages: profile.languages,
      otherSkills: profile.otherSkills,
      bannerUrl: profile.bannerUrl,
      socialLinks: profile.socialLinks ?? [],
    },
    validators: { onChange: profileSchema },
    onSubmit: ({ value }) => {
      update.mutate(value, {
        onSuccess: () => toast.success("Profile saved"),
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
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="designation">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Designation</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Full Stack Developer"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <div className="grid grid-cols-2 gap-4">
          <form.Field name="admissionYear">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Admission Year</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="graduationYear">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Graduation Year</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="rollNumber">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Roll Number</FieldLabel>
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </Field>
          )}
        </form.Field>

        <form.Field name="techStack">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Tech Stack</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="React, Node.js, PostgreSQL"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="languages">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Languages</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="TypeScript, Python, Go"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="otherSkills">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Other Skills</FieldLabel>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="UI/UX, DevOps, ML"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="image">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Profile Picture</FieldLabel>
                <ImageUploadField
                  value={field.state.value || ""}
                  onChange={(url) => field.handleChange(url)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="bannerUrl">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Banner</FieldLabel>
                <ImageUploadField
                  value={field.state.value || ""}
                  onChange={(url) => field.handleChange(url)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="socialLinks" mode="array">
          {(field) => (
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Social Links</FieldLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => field.pushValue({ title: "", link: "" })}
                >
                  <PlusIcon size={14} /> Add
                </Button>
              </div>
              <div className="space-y-2">
                {field.state.value.map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <form.Field name={`socialLinks[${i}].title`}>
                      {(f) => (
                        <Input
                          value={f.state.value}
                          onChange={(e) => f.handleChange(e.target.value)}
                          placeholder="GitHub"
                          className="w-32 shrink-0"
                        />
                      )}
                    </form.Field>
                    <form.Field name={`socialLinks[${i}].link`}>
                      {(f) => (
                        <Input
                          value={f.state.value}
                          onChange={(e) => f.handleChange(e.target.value)}
                          placeholder="https://..."
                          className="flex-1"
                        />
                      )}
                    </form.Field>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => field.removeValue(i)}
                    >
                      <TrashIcon size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting || update.isPending}
            >
              {update.isPending ? "Saving…" : "Save profile"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
