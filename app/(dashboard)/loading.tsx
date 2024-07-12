import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (<div className=" flex h-screen w-screen justify-center items-center">
        <CircularProgress
            variant="indeterminate"
            disableShrink
            size={40}
            thickness={4}
        />
    </div>)
}