import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { quests } from "@/constants";
import { Progress } from "@/components/ui/progress";

type Props = {
    points: number;
};

export const Quests = ({ points }: Props) => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg">
                    Questões
                </h3>
                <Link href="/quests">
                    <Button
                        size="sm"
                        variant="primaryOutline"
                    >
                        View all
                    </Button>
                </Link>
            </div>
            <ul className="w-full space-y-4">
                {quests.map((quest) => {
                    const progress = (points / quest.value) * 100;

                    return (
                        <div
                            className="flex items-center w-full p-4 gap-x-3 border-t-2" //se quiser, no lugar de p-4 coloca pb-4 mas tira o border-t-2
                            key={quest.title}
                        >
                            <Image 
                                src="/points.svg"
                                alt="Points"
                                width={50}
                                height={50}
                            />
                            <div className="flex flex-col gap-y-2 w-full">
                                <p className="text-neutral-700 text-sm font-bold">
                                    {quest.title}
                                </p>
                                <Progress value={progress} className="h-2" />
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
};