import { Tag } from "@/shared/ui/Tag";
import { PostList } from "@/widgets/PostList";

const HomePage = () => {
  return (
    <div className="w-full">
      <div className="mt-7 mb-10">
        <div className="h-[150px] w-full bg-black"></div>
      </div>
      <div className="flex w-full justify-evenly">
        <PostList />
        <div>
          <Tag text="chlgh" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
