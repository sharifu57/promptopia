"use client";

import UpdatePromptContent from "@components/UpdatePromptContent";
import { WithUserAuth } from "@components/WithUserAuth";
import React, { Suspense } from "react";

const UpdatePrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePromptContent />
    </Suspense>
  );
};

export default WithUserAuth(UpdatePrompt);
