"use client";

import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, MODELS } from "@/validators/option-validator";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import LoginModal from "@/components/LoginModal";
import { useCurrentSession } from "@/hooks/use-current-session";

const confettiConfig = {
  angle: 90,
  spread: 313,
  startVelocity: 40,
  elementCount: 200,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const { toast } = useToast();
  const router = useRouter();

  const session = useCurrentSession();
  const user = session?.user;

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setShowConfetti(true);
    localStorage.removeItem("configurationId");
  }, []);

  const { color, model, finish, material } = configuration;

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;

  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL.");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });

  function handleCheckout() {
    if (user) {
      createPaymentSession({ configId: configuration.id });
    } else {
      localStorage.setItem("configurationId", configuration.id);
      setIsLoginModalOpen(true);
    }
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti active={showConfetti} config={confettiConfig} />
      </div>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2 md:self-start mb-5 md:py-5">
          <Phone
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 dark:border-slate-500 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium">Highlights</p>
              <ol className="mt-3 text-zinc-700 dark:text-white list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium">Materials</p>
              <ol className="mt-3 text-zinc-700 dark:text-white list-disc list-inside">
                <li>High-quality, durable material</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <div className="p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600 dark:text-white">Base price</p>
                  <p className="font-medium">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>

                {finish === "textured" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600 dark:text-white">Textured finish</p>
                    <p className="font-medium">
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}

                {material === "polycarbonate" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600 dark:text-white">Soft polycarbonate material</p>
                    <p className="font-medium">
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-gray-200 dark:bg-slate-500" />

                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold">Order total</p>
                  <p className="font-semibold">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pb-12">
              <Button
                onClick={() => handleCheckout()}
                className="px-4 sm:px-6 lg:px-8"
              >
                Check out <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
