import { useState, useEffect } from "react";

function TimeCapsule() {
  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [openDate, setOpenDate] =
    useState("");

  const [letters, setLetters] =
    useState([]);

  useEffect(() => {
    const savedLetters =
      JSON.parse(
        localStorage.getItem(
          "letters"
        )
      ) || [];

    setLetters(savedLetters);
  }, []);

  const saveLetter = () => {
    if (
      !title ||
      !message ||
      !openDate
    )
      return;

    const newLetter = {
      id: Date.now(),
      title,
      message,
      openDate,
      createdAt:
        new Date().toISOString(),
    };

    const updatedLetters = [
      ...letters,
      newLetter,
    ];

    setLetters(updatedLetters);

    localStorage.setItem(
      "letters",
      JSON.stringify(
        updatedLetters
      )
    );

    setTitle("");
    setMessage("");
    setOpenDate("");
  };

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  return (
    <div className="flex-1 p-8">

      <h1 className="text-4xl font-bold">
        📦 Time Capsule
      </h1>

      <p className="text-zinc-400 mt-2 mb-8">
        Write letters to your future self
      </p>

      <div className="bg-zinc-900 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-4">
          New Letter
        </h2>

        <input
          type="text"
          placeholder="Letter Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
        />

        <input
          type="date"
          value={openDate}
          onChange={(e) =>
            setOpenDate(
              e.target.value
            )
          }
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
        />

        <textarea
          rows="6"
          placeholder="Dear Future Me..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
        />

        <button
          onClick={saveLetter}
          className="bg-blue-600 px-5 py-2 rounded-lg"
        >
          Save Letter
        </button>

      </div>

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Your Letters
        </h2>

        <div className="space-y-4">

          {letters.map((letter) => {

            const unlocked =
              today >=
              letter.openDate;

            return (
              <div
                key={letter.id}
                className="bg-zinc-900 p-5 rounded-xl"
              >

                <h3 className="font-bold text-lg">
                  {letter.title}
                </h3>

                <p className="text-zinc-400 text-sm">
                  Opens:
                  {" "}
                  {letter.openDate}
                </p>

                {unlocked ? (
                  <div className="mt-4">

                    <p className="text-green-400 mb-3">
                      📩 Ready to Open
                    </p>

                    <div className="bg-zinc-800 p-4 rounded-lg">
                      {letter.message}
                    </div>

                  </div>
                ) : (
                  <p className="text-yellow-400 mt-3">
                    🔒 Locked
                  </p>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default TimeCapsule;