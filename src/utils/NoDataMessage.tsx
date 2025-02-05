interface messageInterface{
    messageType:string
}
export default function NoDataMessage({messageType}:messageInterface) {
  return (
    <div className='absolute top-[40vh] left-[20vw] md:left-[50vw]'>
      <h1 className="text-[40px]">{'Add ' + messageType}</h1>
    </div>
  )
}
