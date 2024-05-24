import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    notFound();
  }
  const configuration = await db.configuration.findUnique({
    where: {
      id: id,
    },
  });

  if (!configuration) {
    notFound();
  }

  const { imageUrl, width, height } = configuration;

  return (
    <div>
      <DesignConfigurator
        configId={id}
        imageUrl={imageUrl}
        imageDimensions={{ width: width, height: height }}
      />
    </div>
  );
};

export default Page;
