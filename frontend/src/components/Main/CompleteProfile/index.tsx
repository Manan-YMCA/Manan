import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import {
  CustomLinkInput,
  CustomTextInput,
} from "../../Shared/Inputs";
import MastTitle from "../../Shared/MastTitle";
import CustomButton from "../../Shared/CustomButton";
import ImageUploadBox from "../../Shared/ImageUploadBox/ImageUploadBox";
import ErrorModal from "../../Shared/ErrorModal";
import LoadingScreen from "../../Shared/LoadingScreen";
import api from "../../../services/api";
import { uploadImage } from "../../../services/upload";

const createEmptyLink = () => ({ title: "", link: "" });
const getLegacyPassOutYear = (profileData) =>
  profileData?.passOutYear ||
  profileData?.admission ||
  (profileData?.batchDate
    ? new Date(`${profileData.batchDate}T00:00:00`).getFullYear()
    : "");

const CompleteProfile = ({ user, profileData, onProfileSaved }) => {
  const [currentProfileData, setCurrentProfileData] = useState(profileData || null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [linksArray, setLinksArray] = useState([createEmptyLink()]);
  const [profilePic, setProfilePic] = useState<any[]>([]);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const isEditing = Boolean(currentProfileData);

  useEffect(() => {
    setCurrentProfileData(profileData || null);
  }, [profileData]);

  useEffect(() => {
    if (currentProfileData?.socialLinks?.length) {
      setLinksArray(currentProfileData.socialLinks);
    } else {
      setLinksArray([createEmptyLink()]);
    }
    setProfilePic([]);
  }, [currentProfileData]);

  const initialValues = useMemo(
    () => ({
      name: currentProfileData?.name || user?.name || "",
      role: currentProfileData?.role || "",
      passOutYear: getLegacyPassOutYear(currentProfileData),
      languages: currentProfileData?.languages || "",
      frameworks: currentProfileData?.frameworks || "",
      otherSkills: currentProfileData?.otherSkills || "",
      banner: currentProfileData?.banner || "",
    }),
    [currentProfileData, user]
  );

  const addLinkHandler = () => {
    setLinksArray((prev) => {
      if (prev.length < 5) {
        return [...prev, createEmptyLink()];
      }
      return prev;
    });
  };

  const removeLinkHandler = () => {
    setLinksArray((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.slice(0, -1);
    });
  };

  const titleChangeHandler = (event, index) => {
    const nextValue = event.target.value;
    setLinksArray((prev) => {
      const updatedLinks = [...prev];
      updatedLinks[index] = {
        ...updatedLinks[index],
        title: nextValue,
      };
      return updatedLinks;
    });
  };

  const linkChangeHandler = (event, index) => {
    const nextValue = event.target.value;
    setLinksArray((prev) => {
      const updatedLinks = [...prev];
      updatedLinks[index] = {
        ...updatedLinks[index],
        link: nextValue,
      };
      return updatedLinks;
    });
  };

  const removeEmptySocialLinks = (arr) =>
    arr.filter((item) => item.title !== "" && item.link !== "");

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!user) {
      setError("You need to be logged in to complete your profile.");
      return;
    }

    if (!isEditing && profilePic.length === 0) {
      setError("Please select a profile picture.");
      setSubmitting(false);
      return;
    }

    try {
      setFormSubmitting(true);
      setError(null);
      setSuccessMessage("");

      let nextPfp = currentProfileData?.pfp || null;
      let nextPfpPublicId = currentProfileData?.pfpPublicId || null;

      if (profilePic.length > 0) {
        const upload = await uploadImage(profilePic[0], "members");
        nextPfp = upload.secureUrl;
        nextPfpPublicId = upload.publicId;
      }

      const payload = {
        name: values.name,
        passOutYear: Number(values.passOutYear),
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

      let savedProfile;

      if (isEditing) {
        const response = await api.put("/members/me", payload);
        savedProfile = response.data.data;
      } else {
        const response = await api.post("/members/me", payload);
        savedProfile = response.data.data;
      }

      setCurrentProfileData(savedProfile);
      await onProfileSaved?.();
      setProfilePic([]);
      setSuccessMessage(
        isEditing
          ? "Profile updated successfully."
          : "Profile completed successfully."
      );
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Unable to save your profile right now."
      );
    } finally {
      setSubmitting(false);
      setFormSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      {formSubmitting && <LoadingScreen />}
      {error && <ErrorModal errorText={error} clicked={() => setError(null)} />}

      <MastTitle title="Complete Profile" />

      <div className="px-[1rem] py-[2rem] md:px-[5rem]">
        <div className="rounded border p-2 shadow-lg BackgroundBlurForm md:p-6">
          {successMessage && (
            <div className="mx-3 mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(4, "Must be atleast 4 characters")
                .max(100, "Cannot exceed 200 character")
                .required("Required"),
              passOutYear: Yup.number()
                .min(2015, "Pass out year must be 2015 or later")
                .max(
                  new Date().getFullYear() + 4,
                  `Pass out year cannot exceed ${new Date().getFullYear() + 4}`
                )
                .required("Required"),
              role: Yup.string().required("Required"),
              languages: Yup.string().required("Required"),
              frameworks: Yup.string().required("Required"),
              otherSkills: Yup.string().required("Required"),
            })}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <CustomTextInput
                  label="Pass Out Year"
                  name="passOutYear"
                  type="number"
                  placeholder="Enter your pass out year"
                  inputProps={{
                    min: 2015,
                    max: new Date().getFullYear() + 4,
                  }}
                />
                <CustomTextInput
                  label="Name"
                  name="name"
                  placeholder="Name here"
                />
                <CustomTextInput
                  label="Your role"
                  name="role"
                  placeholder='Which role best describes you? Example: "Web Developer", "Competitive Programmer"'
                />
                <CustomTextInput
                  label="Languages"
                  name="languages"
                  placeholder="How many programming languages do you know?"
                />
                <CustomTextInput
                  label="Frameworks/Libraries/Databases"
                  name="frameworks"
                  placeholder="Which frameworks, libraries, or databases do you know?"
                />
                <CustomTextInput
                  label="Other Skills"
                  name="otherSkills"
                  placeholder="Any other skill you want to mention?"
                />
                <CustomTextInput
                  label="Banner image URL"
                  name="banner"
                  placeholder="Put any banner image URL hosted online (optional)"
                />

                <div className="m-3 pt-2 pl-2 font-bold">
                  <p>Select Profile Picture</p>
                </div>
                <ImageUploadBox
                  fileURL={currentProfileData?.pfp}
                  onDrop={(files) => {
                    setProfilePic(files || []);
                  }}
                />

                <div className="m-3 pt-2 pl-2 font-bold">
                  <p>Social Links</p>
                </div>
                {linksArray.map((item, index) => (
                  <CustomLinkInput
                    key={index}
                    onChangeOne={(event) => titleChangeHandler(event, index)}
                    onChangeTwo={(event) => linkChangeHandler(event, index)}
                    labelOne="Link Title"
                    labelTwo="Link"
                    valueOne={item.title}
                    valueTwo={item.link}
                  />
                ))}

                <div className="flex items-center justify-center gap-6">
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
                    isDisabled={formikProps.isSubmitting}
                    type="submit"
                  >
                    <p className="px-2 text-[22px] font-bold dark:text-gray-800">
                      {isEditing ? "Save Changes" : "Complete Profile"}
                    </p>
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CompleteProfile;
