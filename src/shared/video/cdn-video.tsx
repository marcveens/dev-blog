export const CdnVideo = (props: { src: string }) => {
  return (
    <div className="relative aspect-video">
      <iframe
        src={props.src}
        loading="lazy"
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        allowFullScreen={true}
        className="absolute inset-0 h-full w-full"
      ></iframe>
    </div>
  );
};
