"use client";

import Image from "next/image";
import { image1, OfficialLogo1 } from "@public";
import { MessageState, submitMessageForm } from "@redux/slices/messageSlice";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

const ContactPage: FC = () => {
  const [isMessageHelp, setIsMessageHelp] = useState(true);
  const [formData, setFormData] = useState<MessageState>({
    name: "",
    email: "",
    subject: "help",
    message: "",
    phoneNumber: "",
    institutionName: "",
    institutionType: "",
    collaborationType: "",
    traineeExperienceLevel: "",
    partnershipInterest: "",
    additionalInfo: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "help") {
      setIsMessageHelp(true);
    } else {
      setIsMessageHelp(false);
    }
    setFormData({
      ...formData,
      subject: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessageForm(formData);
    // Handle form submission logic (e.g., send data to API)
    alert("Your message has been sent!");
  };

  return (
    <div className="container p-6 md:flex items-start max-md:gap-12 w-full gap-4 relative">
      <div className="max-w-lg md:sticky md:top-[20vh] h-full flex-1">
        <div className="w-full relative flex gap-3 mb-6 lg:flex-row flex-col rounded-md">
          <Image
            src={image1}
            alt="official logo"
            className="rounded-md lg:h-[15rem] h-full w-auto max-lg:object-cover"
          />
          <div className="max-lg:absolute inset-0 max-lg:bg-gradient-to-b from-transparent to-black rounded-md p-3 max-lg:text-white flex flex-col justify-end">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="body-2 mb-6">
              We partner with Universities, Schools, and Training Institutions
              to build the work experience of their students and trainees
              through project-based learning challenges and hackathons. Please
              provide the details below to initiate a partnership or ask for
              help.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-max"
          >
            <span className=" bg-blue-700 text-white rounded-md w-max p-1 leading-none">
              <i className="fab fa-telegram text-2xl"></i>{" "}
            </span>
            Umurava support team
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-max"
          >
            <span className=" bg-green-500 text-white rounded-md w-max p-1 leading-none">
              <i className="fab fa-whatsapp text-2xl"></i>{" "}
            </span>
            Umurava Community
          </a>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-max"
          >
            <span className=" bg-blue-700 text-white rounded-md w-max p-1 leading-none">
              <i className="fab fa-linkedin  text-2xl"></i>{" "}
            </span>
            Umurava Page
          </a>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-md p-4 h-full py-8"
      >
        <div>
          <h3 className="h3 font-semibold">Get in touch with us</h3>
          <p className="body-2 text-zinc-600 mb-4">
            Fill the following information to get to our team.
          </p>
          <span className="text-orange-400">
            (the symbol * means required fields.)
          </span>
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input w-full"
            placeholder="Your full name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address<span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input w-full"
            placeholder="Your email address"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone number<span className="text-red-400">*</span>
          </label>
          <input
            type="phoneNumber"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="input w-full"
            placeholder="Your email address"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject<span className="text-red-400">*</span>
          </label>
          <select
            id="messageType"
            name="messageType"
            onChange={handleSubjectChange}
            className="input w-full"
            required
          >
            <option value="help">Help/Guidance</option>
            <option value="collaboration">Collaboration/Partnership</option>
          </select>
        </div>

        <div className={` ${isMessageHelp && "hidden"}`}>
          <label
            htmlFor="institutionName"
            className="block text-sm font-medium text-gray-700"
          >
            Institution Name<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            disabled={isMessageHelp}
            id="institutionName"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleInputChange}
            className="input w-full"
            placeholder="Name of your institution"
            required
          />
        </div>

        {/* Type of Institution */}
        <div className={` ${isMessageHelp && "hidden"}`}>
          <label
            htmlFor="institutionType"
            className="block text-sm font-medium text-gray-700"
          >
            Type of Institution<span className="text-red-400">*</span>
          </label>
          <select
            id="institutionType"
            disabled={isMessageHelp}
            name="institutionType"
            value={formData.institutionType}
            onChange={handleInputChange}
            className={`input w-full`}
            required
          >
            <option value="">Select Type</option>
            <option value="University">University</option>
            <option value="School">School</option>
            <option value="Training Institution">Training Institution</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Collaboration Type */}
        <div className={` ${isMessageHelp && "hidden"}`}>
          <label
            htmlFor="collaborationType"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred Collaboration Type<span className="text-red-400">*</span>
          </label>
          <select
            id="collaborationType"
            disabled={isMessageHelp}
            name="collaborationType"
            value={formData.collaborationType}
            onChange={handleInputChange}
            className={`input w-full`}
            required
          >
            <option value="">Select Collaboration Type</option>
            <option value="Project-Based Learning">
              Project-Based Learning
            </option>
            <option value="Hackathons">Hackathons</option>
            <option value="Internship Programs">Internship Programs</option>
            <option value="Workshops">Workshops</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Trainee Experience Level */}
        <div className={` ${isMessageHelp && "hidden"}`}>
          <label
            htmlFor="traineeExperienceLevel"
            className="block text-sm font-medium text-gray-700"
          >
            Experience Level of Trainees<span className="text-red-400">*</span>
          </label>
          <select
            id="traineeExperienceLevel"
            disabled={isMessageHelp}
            name="traineeExperienceLevel"
            value={formData.traineeExperienceLevel}
            onChange={handleInputChange}
            className={`input w-full`}
            required
          >
            <option value="">Select Experience Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Partnership Interest */}
        <div className={` ${isMessageHelp && "hidden"}`}>
          <label
            htmlFor="partnershipInterest"
            className="block text-sm font-medium text-gray-700"
          >
            Partnership Interest
          </label>
          <textarea
            id="partnershipInterest"
            disabled={isMessageHelp}
            name="partnershipInterest"
            value={formData.partnershipInterest}
            onChange={handleInputChange}
            className={`input w-full`}
            rows={4}
            placeholder="Why are you interested in partnering with us?"
            required
          />
        </div>

        {/* Additional Information */}
        <div className={` ${isMessageHelp && "hidden"}`}>
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            disabled={isMessageHelp}
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className={`input w-full`}
            rows={5}
            placeholder="Any additional information you would like to share"
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="input w-full"
            rows={5}
            placeholder="Your message"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
