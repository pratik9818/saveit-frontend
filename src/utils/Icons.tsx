const icons = {
  SelectFilesIcon: () => <img className="w-[30px] h-[33px] cursor-pointer" src="/assets/selectfiles.png" alt="Select Files" />,
  ExpandTextIcon: () => <img className="mx-1 cursor-pointer" src="/assets/expandtext.png" alt="Expand Text" />,
  AddTextIcon: () => <img className="cursor-pointer mx-2" src="/assets/addtext.png" alt="Add Text" />,
  UploadIcon: () => <img className="cursor-pointer" src="/assets/uploadfiles.gif" alt="Upload Files" />,
  TagIcon: () => <img className="w-[20px] h-[20px] mx-2 mt-[4px] cursor-pointer" src="/assets/tag.png" alt="tag" />,
  EditTextIcon: () => <img className="w-[20px] h-[20px] mx-2 cursor-pointer" src="/assets/edit.png" alt="edit" />,
  AboutIcon: () => <img className="w-[20px] h-[20px] mx-2 cursor-pointer" src="/assets/about.png" alt="about" />,
  FileIcon: () => <img className="w-[28px] h-[28px] mx-2" src="/assets/file.png" alt="file" />,
  CopyIcon: () => <img className="w-[20px] h-[20px] mx-2 mt-[4px] cursor-copy" src="/assets/copy.png" alt="copy" />,
  LogoIcon:()=> <img onClick={() => location.reload()} className="w-[70px] h-[35px] md:w-[80px] md:h-[35px] mr-4 cursor-pointer" src="/assets/logo.png" alt="Saveit.tech" />,
  backIcon:()=> <img className="w-[33px] h-[30px] cursor-pointer mt-1" src="/assets/backicon.png" alt="back" />,
  newCapsuleIcon:()=> <img className="w-[25px] h-[25px] mr-1" src="/assets/newcapsuleicon.png" alt="add" />,
  capsuleListVisbilityIcon:()=> <img className="w-[30px] h-[30px] cursor-pointer" src="/assets/sidenavicon.png" alt="side nav" />,
};

export default icons;
