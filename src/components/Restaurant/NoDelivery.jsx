import { Player } from "@lottiefiles/react-lottie-player";

const NoDelivery = () => {
  return (
    <div>
      <Player
        src="https://lottie.host/617d82bb-e8a7-49f7-93bf-2b69ac824bf2/ekOz6OP9nk.json"
        className="player  w-[25rem] mt-5"
        autoplay={true}
        loop
      />
      <h1 className="text-center text-2xl ml-8 font-medium text-gray-700 mt-5">
        oh-oh! currently we are not delivering here.
      </h1>
      <h2 className="text-center text-2xl ml-8 font-medium text-gray-700 mt-2">
        change your location to explore.
      </h2>
    </div>
  );
};

export default NoDelivery;
