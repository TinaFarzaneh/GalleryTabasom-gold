import { useEffect, useState, useRef } from "react";
import {
  Button,
  MultipleFileInput,
  // MultipleFileInput,
  SelectBoxSection,
  TextInput,
} from "../../../../components";
import { WrapperModals } from "../wrapper.modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GetCategories, GetSubcategories } from "../../../../services";
import { RxCross2 } from "react-icons/rx";

export const AddEditModal = ({ onClose, onAdd, onEdit, product }) => {
  const isEditing = !!product;

  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState(isEditing ? product.description : "");
  // ****************

  const [selectedThumbnail, setSelectedThumbnail] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);

  // ************CKEDITOR***********//
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);
  //*************************/
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("پر کردن این فیلد الزامی است *"),
    description: Yup.string().trim().required("پر کردن این فیلد الزامی است *"),
    brand: Yup.string().trim().required("پر کردن این فیلد الزامی است *"),
    price: Yup.number()
      .min(0, "قیمت نمی‌تواند منفی باشد")
      .required("پر کردن این فیلد الزامی است *"),
    quantity: Yup.number()
      .min(0, "موجودی نمی‌تواند منفی باشد")
      .required("پر کردن این فیلد الزامی است *"),
    subcategory: Yup.string().required("پر کردن این فیلد الزامی است *"),
    category: Yup.string().required("پر کردن این فیلد الزامی است *"),
    // thumbnail: Yup.mixed().required("وارد کردن تصویر کوچک الزامی است"),
    // images: Yup.mixed().required("وارد کردن تصویر کالا الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      name: isEditing ? product.name : "",
      price: isEditing ? product.price : "",
      brand: isEditing ? product.brand : "",
      quantity: isEditing ? product.quantity : "",
      category: isEditing ? product.category : "",
      description: isEditing ? product.description : "",
      subcategory: isEditing ? product.subcategory : "",
    },
    validationSchema,
    onSubmit: (values) => {
      // ***************************
      let form_data = new FormData();
      form_data.append(`name`, values.name);
      form_data.append(`brand`, values.brand);
      form_data.append(`price`, values.price);
      form_data.append(`quantity`, values.quantity);
      form_data.append(`category`, values.category);
      form_data.append(`subcategory`, values.subcategory);
      form_data.append(`description`, values.description);
      if (selectedThumbnail) {
        form_data.append(`thumbnail`, selectedThumbnail);
      }

      if (selectedImage) {
        selectedImage.forEach((image) => {
          form_data.append(`images`, image);
        });
      }

      const newFormData = Object.fromEntries(form_data.entries());
      console.log(newFormData);

      if (isEditing) {
        onEdit(form_data);
      } else {
        onAdd(form_data);
      }
      formik.resetForm();
      onClose();
    },
  });

  const handleImageChange = (event) => {
    const fileList = event.target.files;
    console.log(fileList);
    const imagesArray = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/")
    );
    console.log(imagesArray);
    setSelectedImage(imagesArray);
  };
  // ****************CHOICESUBCATEGORYBYCATEGORYID************//
  const arrayOfCategory = [...GetCategories()] || [];
  const arrayOfSubCategory = [...GetSubcategories()] || [];
  const result = arrayOfSubCategory.filter(
    (subcategory) => subcategory.category === formik.values.category
  );
  // *********************************************************
  return (
    <WrapperModals>
      <form
        encType="multipart/form-data"
        dir="rtl"
        onSubmit={formik.handleSubmit}
        className="inline-block w-[45rem] p-6 align-bottom bg-[#354535] text-right rounded-lg  overflow-hidden shadow-xl transform transition-all"
      >
        <div className="sm:flex justify-between items-center mb-6 text-[#abd6a9]">
          <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]  text-2xl leading-6 font-bold text-right ">
            افزودن / ویرایش کالا
          </p>
          <RxCross2
            onClick={onClose}
            className="cursor-pointer h-8 w-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] "
          />
        </div>
        <div className="flex flex-col items-center w-11/12 mx-auto">
          {/* <div className="flex items-center justify-between flex-1 w-full gap-3"> */}
          <TextInput
            condition={formik.touched.name && formik.errors.name}
            error={formik.errors.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            label="نام کالا"
            name="name"
            id="name"
            type="text"
            className={`${
              formik.touched.name && formik.errors.name
                ? "border-red-500 focus:outline-none focus:border-red-500"
                : "focus:outline-none focus:border-gray-950"
            }`}
          />
          <TextInput
            condition={formik.touched.brand && formik.errors.brand}
            error={formik.errors.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brand}
            label="برند"
            name="brand"
            id="brand"
            type="text"
            className={`${
              formik.touched.brand && formik.errors.brand
                ? "border-red-500 focus:outline-none focus:border-red-500"
                : "focus:outline-none focus:border-gray-900"
            }`}
          />
          {/* </div> */}

          <div className="flex items-center justify-between flex-1 w-full gap-3">
            <TextInput
              condition={formik.touched.price && formik.errors.price}
              error={formik.errors.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              label="قیمت کالا"
              name="price"
              id="price"
              type="number"
              className={`${
                formik.touched.price && formik.errors.price
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-gray-900"
              }`}
            />
            <TextInput
              condition={formik.touched.quantity && formik.errors.quantity}
              error={formik.errors.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
              label="موجودی"
              name="quantity"
              id="quantity"
              type="number"
              className={`${
                formik.touched.quantity && formik.errors.quantity
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-gray-900"
              }`}
            />
          </div>
          <div className="flex items-center justify-between flex-1 w-full gap-3">
            <SelectBoxSection
              condition={formik.touched.category && formik.errors.category}
              error={formik.errors.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              name="category"
              id="category"
              defaultOption="گروه بندی را انتخاب کن"
              array={arrayOfCategory}
              label="گروه بندی :"
              className={`${
                formik.touched.category && formik.errors.category
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-gray-900"
              }`}
            />
            <SelectBoxSection
              condition={
                formik.touched.subcategory && formik.errors.subcategory
              }
              error={formik.errors.subcategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subcategory}
              defaultOption="زیر گروه را انتخاب کنید"
              array={result}
              label="زیر گروه :"
              name="subcategory"
              id="subcategory"
              className={`${
                formik.touched.subcategory && formik.errors.subcategory
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-gray-900"
              }`}
            />
          </div>
          <div className="flex items-center justify-between flex-1 w-full gap-3 text-yellow-400">
            <MultipleFileInput
              label="تصاویر کالا"
              name="images"
              id="images"
              multiple={true}
              onChange={handleImageChange}
            />
            <MultipleFileInput
              label="تک تصویر کالا"
              name="thumbnail"
              id="thumbnail"
              multiple={false}
              onChange={(event) => {
                setSelectedThumbnail(event.target.files[0]);
              }}
            />
          </div>

          <div className="mb-5 w-full">
            <label className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] block text-[#abd6a9] text-sm font-bold text-right mb-2">
              <div className="flex items-center gap-4">
                توضیحات :
                {formik.touched.description && formik.errors.description && (
                  <div className="text-xs text-red-500">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </label>

            <div>
              {editorLoaded ? (
                <CKEditor
                  type="text"
                  name="description"
                  editor={ClassicEditor}
                  data={data}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setData(data);
                    formik.setFieldTouched("description");
                    formik.setFieldValue("description", data);
                  }}
                />
              ) : (
                <div>Editor loading</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            maincolor="bg-green-500"
            title="ذخیره"
            type="submit"
            className="text-lg"
            onClick={formik.handleSubmit}
          >
            ذخیره
          </Button>
        </div>
      </form>
    </WrapperModals>
  );
};
