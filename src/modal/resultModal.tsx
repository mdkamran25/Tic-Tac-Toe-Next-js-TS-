"use client";
import PortalProvider from "@/components/portalProvider/portalProvider";
import React, { useState } from "react";

const ResultModal = ({ status }: { status: string }) => {
  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <PortalProvider selector="resultModal" show={showModal}>
      {showModal && (
        <>
          
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "15rem",
              height: "15rem",
              zIndex: 10,
            }}
            className="me-1 md:me-2 mt-2 bg-white rounded shadow-md z-10 flex flex-col items-center justify-center"
          >
            <div className="px-4 pt-4 text-center">
              <p className="font-semibold text-black text-2xl pt-1">{status}</p>
            </div>

            <div className="border-t border-gray-200 pt-2 pb-4">
              <button
                className="text-sm text-gray-700 hover:text-gray-900"
                onClick={closeModal}
              >
                close
              </button>
            </div>
          </div>
        </>
      )}
    </PortalProvider>
  );
};

export default ResultModal;
