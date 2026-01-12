document.addEventListener("DOMContentLoaded", function () {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    // Fungsi untuk memuat komponen HTML dan mengganti placeholder
    const loadComponent = async (url, placeholder) => {
        if (!placeholder) return;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Gagal memuat ${url}: ${response.status}`);
            const html = await response.text();
            placeholder.outerHTML = html; // Ganti placeholder dengan konten yang diambil
        } catch (error) {
            console.error(error);
            placeholder.innerHTML = `<p>Gagal memuat komponen.</p>`;
        }
    };

    // Fungsi untuk menandai link navigasi yang aktif
    const setActiveLink = () => {
        // Dapatkan nama file dari URL, default ke "home.html" jika kosong
        const currentPage = window.location.pathname.split("/").pop() || "home.html";
        const navLinks = document.querySelectorAll('.main-nav a.nav-link, .mobile-nav a');
        
        navLinks.forEach(link => {
            // Hapus kelas 'active' dari semua link terlebih dahulu
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    };

    // Fungsi untuk menginisialisasi semua script yang berhubungan dengan header
    const initializeHeaderScripts = () => {
        const hamburger = document.getElementById("hamburger");
        const mobileNav = document.getElementById("mobileNav");
        const header = document.querySelector(".site-header");

        // 1. Fungsionalitas Menu Mobile
        if (hamburger && mobileNav) {
            hamburger.addEventListener("click", () => {
                mobileNav.classList.toggle("open");
                hamburger.classList.toggle("open");
                // Mencegah scroll pada body saat menu mobile terbuka
                document.body.style.overflow = mobileNav.classList.contains("open") ? "hidden" : "";
            });

            // Tutup menu saat salah satu link di dalamnya diklik
            mobileNav.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", () => {
                    mobileNav.classList.remove("open");
                    hamburger.classList.remove("open");
                    document.body.style.overflow = "";
                });
            });
        }

        // 2. Fungsionalitas Hide Header saat Scroll
        if (header) {
            let lastScrollY = window.scrollY;
            window.addEventListener("scroll", () => {
                const currentScrollY = window.scrollY;
                // Sembunyikan header jika scroll ke bawah dan sudah melewati 120px
                if (currentScrollY > lastScrollY && currentScrollY > 120) {
                    header.classList.add("hide");
                } else {
                    header.classList.remove("hide");
                }
                lastScrollY = currentScrollY;
            });
        }
    };

    // Proses utama: muat komponen lalu inisialisasi script
    const initLayout = async () => {
        // Muat header dan footer secara bersamaan
        await Promise.all([
            loadComponent("partials/_header.html", headerPlaceholder),
            loadComponent("partials/_footer.html", footerPlaceholder)
        ]);
        
        // Setelah komponen dimuat, jalankan fungsi-fungsi ini
        setActiveLink();
        initializeHeaderScripts();
    };

    initLayout();
});
