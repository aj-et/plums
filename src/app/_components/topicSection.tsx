import { db } from "@/lib/db";
import Link from "next/link";

interface TopicSectionProps {
  title: string;
  topicId: string | undefined;
}

const TopicSection = async ({ title, topicId }: TopicSectionProps) => {
  const notes = await db.note.findMany({
    where: {
      topicId: topicId,
    },
  });
  const images = await db.image.findMany({
    where: {
      topicId: topicId,
    },
  });
  const links = await db.link.findMany({
    where: {
      topicId: topicId,
    },
  });
  const attachments = await db.attachment.findMany({
    where: {
      topicId: topicId,
    },
  });

  //   console.log("Notes", notes);

  return (
    <div className="flex flex-col justify-center">
      <div className="w-full flex">
        <h2 className="justify-self-start text-[35px] tracking-wide text-neutral-400">
          {title}
        </h2>
      </div>

      <div className="w-[40%] flex justify-around mx-auto bg-fuchsia-900 shadow-xl rounded-xl h-[100px] text-white p-6 relative ">
        <Link
          href={`/${topicId}/${title}`}
          className="block border-2 hover:bg-emerald-600 rounded-xl shadow-xl mr-2 absolute top-2 right-2 "
        >
          More...{" "}
        </Link>
        {notes.map((note) => (
            <Link
              href={`/${topicId}/${title}/${note.id}`}
              key={note.id}
              className="p-4 border-4 border-white hover:border-emerald-600 shadow-xl rounded-xl text-sm cursor-pointer"
            >
              {note.title}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TopicSection;
