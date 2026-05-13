import React, { useEffect, useState } from "react";
import {
  CustomLinkInput,
  CustomTextInput,
  CustomYearPicker,
} from "../../Shared/Inputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import MastTitle from "../../Shared/MastTitle";
import CustomButton from "../../Shared/CustomButton";
import ImageUploadBox from "../../Shared/ImageUploadBox/ImageUploadBox";
import ErrorModal from "../../Shared/ErrorModal";
import LoadingScreen from "../../Shared/LoadingScreen";
import api from "../../../services/api";
import { uploadImage } from "../../../services/upload";

const EditProfile = (props) => {
  const { profileData } = props;
  const [error, setError] = useState<string | null>(null);
  const [linksArray, setLinksArray] = useState(profileData.socialLinks || []);
  const [profilePic, setProfilePic] = useState<any[]>([]);
  const [SelectedYear, setSelectedYear] = useState(
    new Date(profileData.admission, 10, 20)
  );
  const [formSubmitting, SetFormSubmitting] = useState(false);
  const { user } = props;

  const addLinkHandler = () => {
    setLinksArray((prev) => {
      if (prev.length < 5) {
        return [...prev, { title: "", link: "" }];
      }
      return prev;
    });
  };
  const removeLinkHandler = () => {
    setLinksArray((prev) => {
      const newArray = prev.slice(0, -1);
      return newArray;
    });
  };
  const titleChangeHandler = (event, index) => {
    const changes = event.target.value;
    setLinksArray((prev) => {
      const updatedLinks = [...prev];
      updatedLinks[index] = {
        ...updatedLinks[index],
        title: changes,
      };
      return updatedLinks;
    });
  };
  const linkChangeHandler = (event, index) => {
    const changes = event.target.value;
    setLinksArray((prev) => {
      const updatedLinks = [...prev];
      updatedLinks[index] = {
        ...updatedLinks[index],
        link: changes,
      };
      return updatedLinks;
    });
  };
  const removeEmptySocialLinks = (arr) => {
    const modArr = arr.filter((a) => a.title !== "" && a.link !== "");
    return modArr;
  };
  const dataSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    if (user) {
      try {
        SetFormSubmitting(true);
        let nextPfp = profileData.pfp;
        let nextPfpPublicId = profileData.pfpPublicId || null;

        if (profilePic.length > 0) {
          const upload = await uploadImage(profilePic[0], "members");
          nextPfp = upload.secureUrl;
          nextPfpPublicId = upload.publicId;
        }

        const data = {
          name: values.name,
          admission: SelectedYear.getFullYear(),
          role: values.role,
          frameworks: values.frameworks,
          languages: values.languages,
          otherSkills: values.otherSkills,
          socialLinks: removeEmptySocialLinks(linksArray),
          banner: values.banner,
          pfp: nextPfp,
          pfpPublicId: nextPfpPublicId,
          email: user.email,
        };

        await api.put("/members/me", data);
        await props.onProfileSaved?.();
        window.location.href = "/members";
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to update profile.");
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
          <MastTitle title="Edit Profile" />
          {error && (
            <ErrorModal errorText={error} clicked={() => setError(null)} />
          )}
          {formSubmitting && <LoadingScreen />}
          <div className="px-[1rem]  md:px-[5rem] py-[2rem] ">
            <div className="BackgroundBlurForm p-2 md:p-6 rounded border shadow-lg">
              <Formik
                initialValues={{
                  name: profileData.name,
                  role: profileData.role,
                  admission: profileData.admission,
                  languages: profileData.languages,
                  frameworks: profileData.frameworks,
                  otherSkills: profileData.otherSkills,
                  banner: profileData.banner,
                }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .min(4, "Must be atleast 4 characters")
                    .max(100, "Cannot exceed 200 character")
                    .required("Required"),
                  role: Yup.string().required("Required"),
                  languages: Yup.string().required("Required"),
                  frameworks: Yup.string().required("Required"),
                  otherSkills: Yup.string().required("Required"),
                })}
                onSubmit={dataSubmitHandler}
              >
                {(props) => (
                  <Form>
                    <CustomTextInput
                      label="Name"
                      name="name"
                      placeholder="Name here"
                    />
                    <CustomYearPicker
                      value={SelectedYear}
                      onChange={(newValue) => {
                        setSelectedYear(newValue);
                      }}
                      label="Year of admission"
                      name="admission"
                      placeholder="Select your year of admission"
                    />
                    <CustomTextInput
                      label="Your role "
                      name="role"
                      placeholder='Which role best describes you ? for example "Web Developer", "Competitive programmer" '
                    />
                    <CustomTextInput
                      label="Languages"
                      name="languages"
                      placeholder="How many programming languages do you know of? "
                    />
                    <CustomTextInput
                      label="Frameworks/Libraries/Databases"
                      name="frameworks"
                      placeholder="How many Framework/Libraries/Databases do you know of? "
                    />
                    <CustomTextInput
                      label="Other Skills"
                      name="otherSkills"
                      placeholder="Any other skill you want to mention? "
                    />{" "}
                    <CustomTextInput
                      label="Banner image URL"
                      name="banner"
                      placeholder="Put any banner image URL hosted online (optional)"
                    />
                    <div className="m-3 pt-2 pl-2 font-bold">
                      <p>Select Profile Picture</p>
                    </div>
                    <ImageUploadBox
                      fileURL={profileData.pfp}
                      onDrop={(files) => {
                        setProfilePic(files);
                      }}
                    />
                    <div className="m-3 pt-2 pl-2 font-bold">
                      <p>Social Links</p>
                    </div>
                    {linksArray.map((item, index) => (
                      <CustomLinkInput
                        key={index}
                        onChangeOne={(event) =>
                          titleChangeHandler(event, index)
                        }
                        onChangeTwo={(event) => linkChangeHandler(event, index)}
                        labelOne="Link Title"
                        labelTwo="Link"
                        valueOne={item.title}
                        valueTwo={item.link}
                      />
                    ))}
                    <div className="flex gap-6 items-center justify-center">
                      <AiOutlinePlusCircle
                        className="cursor-pointer"
                        onClick={addLinkHandler}
                        fontSize={40}
                        color="black"
                      />
                      {linksArray.length > 1 && (
                        <AiOutlineMinusCircle
                          onClick={removeLinkHandler}
                          className="cursor-pointer"
                          fontSize={40}
                          color="maroon"
                        />
                      )}
                    </div>
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

export default EditProfile;
