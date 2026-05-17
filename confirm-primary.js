import { supabase } from "./supabase-init.js";

const gr = localStorage.getItem("primary_gr");

// ONLY 2 VOTES
const votes = {
    headboy: localStorage.getItem("vote_headboy") || "ABSTAIN",
    headgirl: localStorage.getItem("vote_headgirl") || "ABSTAIN"
};

// SESSION ID
const sessIdEl = document.getElementById("sessId");
if (sessIdEl && gr) sessIdEl.textContent = `#${gr}`;

// DISPLAY
const hbEl = document.getElementById("hb");
if (hbEl) hbEl.textContent = votes.headboy;

const hgEl = document.getElementById("hg");
if (hgEl) hgEl.textContent = votes.headgirl;

// FINAL SUBMIT
const finalBtn = document.getElementById("finalBtn");

if (finalBtn) {
    finalBtn.addEventListener("click", async () => {

        const loader = document.getElementById("loader");

        finalBtn.disabled = true;

        if (loader) {
            loader.classList.remove("hidden");
            loader.classList.add("flex");
        }

        try {

            const isTch = gr && gr.startsWith("TCH");

            // check already voted
            if (!isTch && gr) {
                const { data } = await supabase
                    .from("students")
                    .select("voted_primary")
                    .eq("cid", gr)
                    .single();

                if (data?.voted_primary) {
                    alert("Vote already cast for this ID.");
                    window.location.href = "index.html";
                    return;
                }
            }

            // submit votes
            for (const role in votes) {

                if (votes[role] !== "ABSTAIN") {

                    const { error } = await supabase.rpc("vote_upsert_secure", {
                        p_role: role,
                        p_candidate_name: votes[role],
                        p_voter_id: gr || "GUEST"
                    });

                    if (error) throw error;
                }
            }

            // mark voted
            if (!isTch && gr) {
                await supabase
                    .from("students")
                    .update({ voted_primary: true })
                    .eq("cid", gr);
            }

            // clear storage
            localStorage.removeItem("vote_headboy");
            localStorage.removeItem("vote_headgirl");

            // redirect
            setTimeout(() => {
                window.location.href = "success-primary.html";
            }, 800);

        } catch (err) {

            console.error(err);

            if (loader) {
                loader.classList.add("hidden");
                loader.classList.remove("flex");
            }

            alert("System Failure — Try Again");

            finalBtn.disabled = false;
        }
    });
}

// RESTART
const restartBtn = document.getElementById("restartBtn");

if (restartBtn) {
    restartBtn.addEventListener("click", () => {

        if (confirm("Discard all current selections?")) {

            localStorage.removeItem("vote_headboy");
            localStorage.removeItem("vote_headgirl");

            window.location.href = "student-primary.html";
        }
    });
}

// TOAST
function showToast(msg, bg) {
    const toast = document.getElementById("toast");

    if (toast) {
        toast.textContent = msg;

        toast.className =
            `fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold text-sm z-50 transition-all ${bg} block fadeIn`;

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000);
    }
}










