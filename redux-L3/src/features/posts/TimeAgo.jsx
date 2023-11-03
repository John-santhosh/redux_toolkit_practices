import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timeStamp }) => {
  let timeAgo = "";
  if (timeStamp) {
    // console.log(timeStamp);
    const date = parseISO(timeStamp);
    // console.log(date);
    const timePeriod = formatDistanceToNow(date);
    // console.log(timePeriod);
    timeAgo = `${timePeriod} ago`;
  }
  return <span>&nbsp; {timeAgo}</span>;
};

export default TimeAgo;
