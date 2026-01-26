"use client";

import { useState } from "react";
import NebulaBackground from "@/shared/components/dreamcatcher/NebulaBackground";

export default function BlogBackground() {
  const [currentDate] = useState(() => new Date());
  return <NebulaBackground date={currentDate} />;
}
