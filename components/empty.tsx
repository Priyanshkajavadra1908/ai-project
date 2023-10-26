import Image from "next/image";

interface EmptyProps {
    lable :string ;
}

const Empty = ({
    lable
} : EmptyProps) => {
    return ( 
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72 ">
                <Image alt="Empty" fill src="/empty.png"/>
            </div>
            <div className="text-muted-foreground text-sm text-center">
                <p>
                    {lable}
                </p>
            </div>
        </div>
     );
}
 
export default Empty;