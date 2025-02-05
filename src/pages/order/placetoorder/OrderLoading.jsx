import { ClipLoader } from "react-spinners";

const OrderLoading = () => {
  return (
    <div className="relative w-full h-dvh flex justify-center items-center overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <img
        src="/loadingImage.jpg"
        alt=""
        className="w-full h-dvh object-cover"
      />
      <div className="absolute flex flex-col top-1/4">
        <span className="text-2xl font-semibold text-start text-primary">
          예약부터 결제까지
        </span>
        <img src="/logo.png" className="w-96" />
      </div>
      <div className="absolute flex flex-col items-center gap-4">
        <ClipLoader
          cssOverride={{
            borderWidth: "7px",
          }}
          loading
          size={100}
          speedMultiplier={0.8}
          color="#333333"
        />
        <div className="text-2xl font-semibold drop-shadow-xl text-black">
          결제 요청중
        </div>
      </div>
    </div>
  );
};
export default OrderLoading;
