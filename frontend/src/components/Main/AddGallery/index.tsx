import React, { useState } from "react";
import { CustomTextInput } from "../../Shared/Inputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MastTitle from "../../Shared/MastTitle";
import CustomButton from "../../Shared/CustomButton";
import ImageUploadBox from "../../Shared/ImageUploadBox/ImageUploadBox";
import ErrorModal from "../../Shared/ErrorModal";
import LoadingScreen from "../../Shared/LoadingScreen";
import api from "../../../services/api";
import { uploadImage } from "../../../services/upload";

const AddGallery = ({ user }) => {
  const [error, setError] = useState<string | null>(null);
  const [galleryPic, setGalleryPic] = useState<any>(null);
  const [formSubmitting, SetFormSubmitting] = useState(false);

  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    if (!galleryPic) {
      setError("Please select a Gallery picture");
    } else if (galleryPic.length === 0) {
      setError("Please select a Gallery picture");
    } else {
      try {
        SetFormSubmitting(true);
        const upload = await uploadImage(galleryPic[0], "gallery");
        const data = {
          name: values.name,
          desc: values.desc,
          image: upload.secureUrl,
          imagePublicId: upload.publicId,
        };

        await api.post("/gallery", data);
        setGalleryPic(null);
        resetForm();
        window.location.href = "/gallery";
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to upload image.");
      } finally {
        setSubmitting(false);
        SetFormSubmitting(false);
      }
    }
  };
  return (
    <React.Fragment>
      {user && (
        <div>
          <MastTitle title="Add Gallery Picture" />
          {error && (
            <ErrorModal errorText={error} clicked={() => setError(null)} />
          )}
          {formSubmitting && <LoadingScreen />}
          <div className="px-[1rem]  md:px-[5rem] py-[2rem] ">
            <div className="BackgroundBlurForm p-2 md:p-6 rounded border shadow-lg">
              <Formik
                initialValues={{
                  name: "",
                  desc: "",
                }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .min(4, "Must be atleast 4 characters")
                    .max(100, "Cannot exceed 200 character")
                    .required("Required"),
                  desc: Yup.string().required("Required"),
                })}
                onSubmit={dataSubmitHandler}
              >
                {(props) => (
                  <Form>
                    <CustomTextInput
                      label="Name of the event"
                      name="name"
                      placeholder="Name here"
                    />
                    <CustomTextInput
                      label="Description"
                      name="desc"
                      placeholder="Supports Markdown"
                      multiline
                    />
                    <div className="m-3 pt-2 pl-2 font-bold">
                      <p>Select Gallery Picture</p>
                    </div>
                    <ImageUploadBox
                      onDrop={(files) => {
                        setGalleryPic(files);
                      }}
                    />
                    <div className="mt-6 flex items-center justify-center">
                      <CustomButton
                        isDisabled={props.isSubmitting}
                        type="submit"
                        text={props.isSubmitting ? "Submitting" : "Submit"}
                      >
                        <p className="dark:text-gray-800 px-2 text-[22px] font-bold">
                          Submit
                        </p>
                      </CustomButton>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className="w-screen h-screen">
          <LoadingScreen />
        </div>
      )}
    </React.Fragment>
  );
};

export default AddGallery;
