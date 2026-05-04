import { useEffect, useState } from "react";
import {
  Download,
  Printer,
  RefreshCw,
  CreditCard
} from "lucide-react";
import toast from "react-hot-toast";
import useABDM from "../../hooks/useABDM";

type Props = {
  abhaNumber: string;
  transactionId: string;
};

const AbhaCard = ({
  abhaNumber,
  transactionId,
}: Props) => {
  const { generateAbhaCard } = useABDM();

  const [cardData, setCardData] =
    useState<string>("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ---------------- FETCH CARD ----------------
  useEffect(() => {
    if (
      abhaNumber &&
      transactionId
    ) {
      fetchAbhaCard();
    }
  }, [abhaNumber, transactionId]);

  const fetchAbhaCard = async () => {
      try {
        setLoading(true);
        setError("");

        const payload = {
          abhaNumber,
          transactionId,
        };

        const result = await generateAbhaCard(payload);

        if (!result || !result.success) {
          setError(
            "Failed to generate ABHA card"
          );
          return;
        }

        try {
          const parsed = JSON.parse(
            result.data
          );

          console.log(
            "Parsed ABHA Card:",
            parsed
          );

          if (parsed.success) {
            setCardData(
              parsed?.data
                ?.cardData || ""
            );

            toast.success(
              parsed.message ||
                "ABHA Card Generated"
            );
          } else {
            setError(
              parsed.message ||
                "Failed to generate ABHA card"
            );
          }
        } catch (parseError) {
          console.error(
            "JSON Parse Error:",
            parseError
          );

          setError(
            "Invalid response format"
          );
        }
      } catch (err) {
        console.error(err);

        setError(
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  // ---------------- DOWNLOAD ----------------
  const handleDownload =
    () => {
      if (!cardData) {
        toast.error(
          "ABHA card not available"
        );
        return;
      }

      const link =
        document.createElement(
          "a"
        );

      link.href = cardData;
      link.download =
        "abha-card.png";

      document.body.appendChild(
        link
      );
      link.click();
      document.body.removeChild(
        link
      );
    };

  // ---------------- PRINT ----------------
  const handlePrint =
    () => {
      if (!cardData) {
        toast.error(
          "ABHA card not available"
        );
        return;
      }

      const printWindow =
        window.open(
          "",
          "_blank"
        );

      if (!printWindow) {
        toast.error(
          "Unable to open print window"
        );
        return;
      }

      printWindow.document.write(`
        <html>
          <head>
            <title>Print ABHA Card</title>
            <style>
              body{
                margin:0;
                display:flex;
                justify-content:center;
                align-items:center;
                padding:20px;
              }
              img{
                max-width:100%;
                height:auto;
              }
            </style>
          </head>
          <body>
            <img src="${cardData}" />
          </body>
        </html>
      `);

      printWindow.document.close();

      setTimeout(() => {
        printWindow.print();
      }, 500);
    };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <CreditCard
            className="text-green-600"
            size={28}
          />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Your ABHA Card
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Download or print your verified ABHA card
        </p>
      </div>

      {/* Actions */}
      {!loading &&
        cardData && (
          <div className="flex justify-center gap-3 mb-6 flex-wrap">

            <button
              onClick={
                handleDownload
              }
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
            >
              <Download size={16} />
              Download
            </button>

            <button
              onClick={
                handlePrint
              }
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
            >
              <Printer size={16} />
              Print
            </button>

          </div>
        )}

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500">
          Generating ABHA Card...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center space-y-3">
          <p className="text-red-500">
            {error}
          </p>

          <button
            onClick={
              fetchAbhaCard
            }
            className="inline-flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md"
          >
            <RefreshCw
              size={16}
            />
            Retry
          </button>
        </div>
      )}

      {/* Card Preview */}
      {!loading &&
        !error &&
        cardData && (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-4">

            <img
              src={cardData}
              alt="ABHA Card"
              className="w-full h-auto object-contain"
            />
          </div>
        )}
    </div>
  );
};

export default AbhaCard;