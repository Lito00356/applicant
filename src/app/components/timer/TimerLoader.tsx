import ElapsedTimer from "@/src/app/components/timer/ElapsedTimer";
import { parseSqliteDate } from "@/src/app/lib/format";
import { requireUser } from "@/src/app/lib/sessions";

const TimerLoader = async () => {
  const user = await requireUser();
  const time = parseSqliteDate(user.createdAt, true).getTime();

  return <ElapsedTimer startDate={time} />;
};

export default TimerLoader;
