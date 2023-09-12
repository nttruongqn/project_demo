import * as React from "react";
import { Product } from "../../../../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Grid, Button, CircularProgress, TextField, Typography } from "@mui/material";
import {
  InputField,
  SelectGroupField,
} from "../../../../components/FormFields";
import { useAppSelector } from "../../../../app/hooks";
import { selectCategoryOptions } from "../../category/category.slice";
import { brandApi } from "../../../../api/brandApi";
import { CheckboxTrueFalse } from "../../../../components/FormFields/CheckboxTrueFalse";
import { mobileSystemApi } from "../../../../api/mobileSystemApi";
import { AdvancedShootingList, BatteryCapacityList, BatteryTechnologyList, BatteryTypeList, BluetoothList, CPUList, ChargingPortList, DesignList, FilmRearCameraList, GPSList, GPUList, NetworkConnectionList, OperationSystemList, OtherConnectList, RamList, ResolutionFrontCameraList, ResolutionList, ResolutionRearCameraList, RomList, SDCardList, SIMList, TechnologyScreenList, VideoCallList, WideScreenList, WifiList } from "../../../../models/mobile-system-child-element";
import { ProductDataPayload } from "../../../../models/product-data-payload.model";
import * as yup from "yup";
import JoditReact from "jodit-react-ts";
import JoditEditor from "jodit-react";

export interface ProductFormProps {
  initialValues?: Product;
  onSubmit?: (formValues: ProductDataPayload) => void;
}

export interface DataOptions {
  label: string,
  value: string
}

const schema = yup.object({
  name: yup.string().required("Vui lòng nhập tên"),
  price: yup.number().required("Vui lòng nhập giá tiền"),
  brandId: yup.string().required("Vui lòng chọn nhãn"),
  categoryId: yup.string().required("Vui lòng chọn danh mục"),
  // wideScreenName: yup.string().required("Vui lòng nhập độ rộng"),
  // resolutionName: yup.string().required("Vui lòng nhập độ phân giải"),
  technologyScreenId: yup.string().required("Vui lòng chọn công nghệ màn hình"),
  // filmRearCameraName: yup.string().required("Vui lòng nhập quay film camera sau"),
  // advancedShootingName: yup.string().required("Vui lòng nhập chụp nâng cao camera sau"),
  // resolutionRearCameraName: yup.string().required("Vui lòng nhập độ phân giải camera sau"),
  // resolutionFrontCameraName: yup.string().required("Vui lòng nhập độ phân giải camera trước"),
  // videoCallName: yup.string().required("Vui lòng chọn video call camera trước"),
  operationSystemId: yup.string().required("Vui lòng chọn hệ điều hành"),
  cpuId: yup.string().required("Vui lòng chọn cpu"),
  gpuId: yup.string().required("Vui lòng chọn gpu"),
  ramId: yup.string().required("Vui lòng chọn ram"),
  romId: yup.string().required("Vui lòng chọn rom"),
  sdCardId: yup.string().required("Vui lòng chọn thẻ nhớ"),
  bluetoothId: yup.string().required("Vui lòng chọn bluetooth"),
  // mobileNetworkId: yup.string().required("Vui lòng chọn mạng di động"),
  chargingPortId: yup.string().required("Vui lòng chọn cổng kết nối"),
  networkConnectionId: yup.string().required("Vui lòng chọn kết nối mạng"),
  simId: yup.string().required("Vui lòng chọn sim"),
  wifiId: yup.string().required("Vui lòng chọn wifi"),
  gpsId: yup.string().required("Vui lòng chọn nhãn"),
  otherConnectId: yup.string().required("Vui lòng chọn kết nối khác"),
  batteryTypeId: yup.string().required("Vui lòng chọn loại pin"),
  // batteryTechnologyName: yup.string().required("Vui lòng nhập công nghệ pin"),
  batteryCapacityId: yup.string().required("Vui lòng chọn dung lượng pin"),
  designId: yup.string().required("Vui lòng chọn thiết kế"),
  // weightName: yup.string().required("Vui lòng nhập trọng lượng"),
  // sizeName: yup.string().required("Vui lòng nhập kích thước"),
  // materialName: yup.string().required("Vui lòng nhập nguyên liệu"),
}).required();

export function ProductForm({ initialValues, onSubmit }: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductDataPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const [imagePreview, setImagePreview] = React.useState<any>();
  const [brandList, setBrandList] = React.useState<DataOptions[]>([]);
  // const [resolutionList, setResolutionList] = React.useState<ResolutionList[]>([]);
  // const [wideScreenList, setWideScreenList] = React.useState<WideScreenList[]>([]);
  const [technologyScreenList, setTechnologyScreenList] = React.useState<TechnologyScreenList[]>([]);
  // const [advancedShootingList, setAdvancedShootingList] = React.useState<AdvancedShootingList[]>([]);
  // const [filmRearCameraList, setFilmRearCameraList] = React.useState<FilmRearCameraList[]>([]);
  // const [resolutionRearCameraList, setResolutionRearCameraList] = React.useState<ResolutionRearCameraList[]>([]);
  // const [resolutionFrontCameraList, setResolutionFrontCameraList] = React.useState<ResolutionFrontCameraList[]>([]);
  // const [videoCallList, setVideoCallList] = React.useState<VideoCallList[]>([]);
  const [operationSystemList, setOperationSystemList] = React.useState<OperationSystemList[]>([]);
  const [gpuList, setGpuList] = React.useState<GPUList[]>([]);
  const [cpuList, setCpuList] = React.useState<CPUList[]>([]);
  const [ramList, setRamList] = React.useState<RamList[]>([]);
  const [romList, setRomList] = React.useState<RomList[]>([]);
  const [sdCardList, setSDCardList] = React.useState<SDCardList[]>([]);
  const [bluetoothList, setBluetoothList] = React.useState<BluetoothList[]>([]);
  const [networkConnectionList, setNetworkConnectionList] = React.useState<NetworkConnectionList[]>([]);
  const [chargingPortList, setChargingPortList] = React.useState<ChargingPortList[]>([]);
  const [simList, setSimList] = React.useState<SIMList[]>([]);
  const [wifiList, setWifiList] = React.useState<WifiList[]>([]);
  const [gpsList, setGpsList] = React.useState<GPSList[]>([]);
  const [otherConnectList, setOtherConnectList] = React.useState<OtherConnectList[]>([]);
  const [batteryTypeList, setBatteryTypeList] = React.useState<BatteryTypeList[]>([]);
  const [batteryCapacityList, setBatteryCapacityList] = React.useState<BatteryCapacityList[]>([]);
  // const [batteryTechnologyList, setBatteryTechnologyList] = React.useState<BatteryTechnologyList[]>([]);
  const [designList, setDesignList] = React.useState<DesignList[]>([]);
  const categoryOptions = useAppSelector(selectCategoryOptions);
  const editor = React.useRef(null);
  const [content, setContent] = React.useState('');
  const config = {
    placeholder: "Nhập nội dung bài viết"
  }
  React.useEffect(() => {
    if(initialValues?.contentHTML){
      setContent(initialValues.contentHTML)
    }
  }, [])

  React.useEffect(() => {
    (async () => {
      const brandData = await brandApi.getAll();
      const brandDataOptions = brandData.map((item) => {
        return {
          label: item.brandName,
          value: item.id
        }
      })
      setBrandList(brandDataOptions)
    })()
  }, [])

  React.useEffect(() => {
    (async () => {
      const data = await mobileSystemApi.getChildElements();
      // setResolutionList(data.resolutionList)
      // setWideScreenList(data.wideScreenList)
      setTechnologyScreenList(data.technologyScreenList)
      // setAdvancedShootingList(data.advancedShootingList)
      // setFilmRearCameraList(data.filmRearCameraList)
      // setResolutionRearCameraList(data.resolutionRearCameraList)
      // setResolutionFrontCameraList(data.resolutionFrontCameraList)
      // setVideoCallList(data.videoCallList)
      setOperationSystemList(data.operationSystemList)
      setGpuList(data.gpuList)
      setCpuList(data.cpuList)
      setRamList(data.ramList)
      setRomList(data.romList)
      setSDCardList(data.sdCardList)
      setBluetoothList(data.bluetoothList)
      setNetworkConnectionList(data.networkConnectionList)
      setChargingPortList(data.chargingPortList)
      setSimList(data.simList)
      setWifiList(data.wifiList)
      setGpsList(data.gpsList)
      setOtherConnectList(data.otherConnectList)
      setBatteryTypeList(data.batteryTypeList)
      setBatteryCapacityList(data.batteryCapacityList)
      // setBatteryTechnologyList(data.batteryTechnologyList)
      setDesignList(data.designList)
    })()
  }, [])



  React.useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview.preview);
    };
  }, [imagePreview]);
  

  const handleImageChange = (event: any) => {
    // setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImagePreview(file);
  };

  const handleFormSubmit = async (formValues: ProductDataPayload) => {
    if (imagePreview) {
      formValues.file = imagePreview;
    }
    formValues.contentHTML = content;
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      console.log("Failed submit", error);
    }
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box>
            <Typography fontWeight={700}>Chung</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <InputField name="name" control={control} label="Tên sản phẩm" />
              </Grid>
              <Grid item xs={6}>
                <InputField name="price" control={control} label="Giá" />
              </Grid>

              {/* 
            <Grid item xs={6}>
              <InputField
                name="descriptionSeo"
                control={control}
                label="Description Seo"
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                name="keywordSeo"
                control={control}
                label="KeywordSeo"
              />
            </Grid> */}
              <Grid item xs={6}>
                <SelectGroupField
                  name="categoryId"
                  control={control}
                  label="Danh mục"
                  options={categoryOptions}
                />
              </Grid>
              <Grid item xs={6}>
                <SelectGroupField
                  name="brandId"
                  control={control}
                  label="Thương hiệu"
                  options={brandList}
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography fontWeight={700}>Màn hình</Typography>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <SelectGroupField
                  name="technologyScreenId"
                  control={control}
                  label="Công nghệ màn hình"
                  options={technologyScreenList}
                />
              </Grid>

              <Grid item xs={3}>
                <InputField name="wideScreenName" control={control} label="Độ rộng màn hình" />
              </Grid>

              <Grid item xs={3}>
                <InputField name="resolutionName" control={control} label="Độ phân giải" />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography fontWeight={700}>Camera sau</Typography>
            <Grid container spacing={1}>
            <Grid item xs={3}>
                <InputField name="advancedShootingName" control={control} label="Chụp nâng cao" />
              </Grid>

              <Grid item xs={3}>
                <InputField name="filmRearCameraName" control={control} label="Quay phim"/>
              </Grid>

              <Grid item xs={3}>
                <InputField name="resolutionRearCameraName" control={control} label="Độ phân giải" />
              </Grid>

              <Grid item xs={3}>
                <CheckboxTrueFalse
                  name="isFlashLight"
                  control={control}
                  label="Đèn Flash"
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography fontWeight={700}>Camera Trước</Typography>
            <Grid container spacing={1}>
            <Grid item xs={3}>
                <InputField name="resolutionFrontCameraName" control={control} label="Độ phân giải"/>
              </Grid>

              <Grid item xs={3}>
                <InputField name="videoCallName" control={control} label="Video call"/>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography fontWeight={700}>Hệ điều hành, CPU & GPU</Typography>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <SelectGroupField
                  name="operationSystemId"
                  control={control}
                  label="Hệ điều hành"
                  options={operationSystemList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="cpuId"
                  control={control}
                  label="CPU"
                  options={cpuList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="gpuId"
                  control={control}
                  label="GPU"
                  options={gpuList}
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography fontWeight={700}>Rom & Ram</Typography>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <SelectGroupField
                  name="romId"
                  control={control}
                  label="Rom"
                  options={romList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="ramId"
                  control={control}
                  label="Ram"
                  options={ramList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="sdCardId"
                  control={control}
                  label="SDCard"
                  options={sdCardList}
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography fontWeight={700}>Kết nối</Typography>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <SelectGroupField
                  name="bluetoothId"
                  control={control}
                  label="Bluetooth"
                  options={bluetoothList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="networkConnectionId"
                  control={control}
                  label="Kết nối mạng"
                  options={networkConnectionList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="chargingPortId"
                  control={control}
                  label="Cổng kết nối"
                  options={chargingPortList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="simId"
                  control={control}
                  label="SIM"
                  options={simList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="wifiId"
                  control={control}
                  label="Wifi"
                  options={wifiList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="gpsId"
                  control={control}
                  label="GPS"
                  options={gpsList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="otherConnectId"
                  control={control}
                  label="Kết nối khác"
                  options={otherConnectList}
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography fontWeight={700}>Pin</Typography>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <SelectGroupField
                  name="batteryTypeId"
                  control={control}
                  label="Loại pin"
                  options={batteryTypeList}
                />
              </Grid>

              <Grid item xs={3}>
                <SelectGroupField
                  name="batteryCapacityId"
                  control={control}
                  label="Dung lượng pin"
                  options={batteryCapacityList}
                />
              </Grid>

              <Grid item xs={3}>
                <InputField name="batteryTechnologyName" control={control} label="Công nghệ pin"/>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography fontWeight={700}>Thông tin thiết kế</Typography>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <InputField name="materialName" control={control} label="Chất liệu" />
              </Grid>
              <Grid item xs={3}>
                <InputField name="sizeName" control={control} label="Kích thước" />
              </Grid>
              <Grid item xs={3}>
                <InputField name="weightName" control={control} label="Trọng lượng" />
              </Grid>
              <Grid item xs={3}>
                <SelectGroupField
                  name="designId"
                  control={control}
                  label="Thiết kế"
                  options={designList}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ paddingY: 2 }}>
            <Typography fontWeight={700}>Bài viết</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <JoditEditor
                  ref={editor}
                  config={config}
                  value={content}
                  onBlur={newContent => setContent(newContent)}
                  onChange={newContent => { }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography fontWeight={700}>Ảnh</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6} >
                <label className="">
                  <input type="file" onChange={handleImageChange} />
                </label>
                {imagePreview && (
                  <img className="my-4 w-[200px] h-[200px] object-contain" src={imagePreview.preview} alt="" />
                )}
                {!imagePreview && (
                  <img className="my-4 w-[200px] h-[200px]" src={initialValues?.imageUrl} alt="" />
                )}
              </Grid>
            </Grid>
          </Box>

          <Box mt="20px">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting && <CircularProgress size={16} />} &nbsp;Lưu
            </Button>
          </Box>
        </form>
      </Box >
    </>
  );
}
