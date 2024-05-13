import Image from 'next/image'


//Add the height prop to this so that I can pass in custom height and width
export function MdxImage(props) {
  return <Image {...props} alt={props.alt} />;
}
