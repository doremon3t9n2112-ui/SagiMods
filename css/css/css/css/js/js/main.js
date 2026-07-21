document.addEventListener("DOMContentLoaded", () => {
    const modsGrid = document.getElementById("mods-grid");
    const searchInput = document.getElementById("search-input");

    // Modal elements
    const modal = document.getElementById("mod-modal");
    const modalClose = document.getElementById("modal-close");
    const modalImg = document.getElementById("modal-preview-img");
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalVersion = document.getElementById("modal-version");
    const modalDesc = document.getElementById("modal-desc");
    const modalSteps = document.getElementById("modal-steps");
    const modalDownloadLink = document.getElementById("modal-download-link");

    // Render danh sách Mod
    function renderMods(items) {
        modsGrid.innerHTML = "";

        if (items.length === 0) {
            modsGrid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 2rem;">Không tìm thấy Mod phù hợp.</p>`;
            return;
        }

        items.forEach(mod => {
            const card = document.createElement("div");
            card.className = "card";
            card.style.cursor = "pointer";
            card.innerHTML = `
                <div>
                    <div class="card-header">
                        <div class="card-icon"><i data-lucide="${mod.icon}"></i></div>
                        <div class="card-title">
                            <h3>${mod.title}</h3>
                            <span class="version">${mod.version}</span>
                        </div>
                    </div>
                    <p class="card-desc">${mod.description}</p>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <span class="stat-item"><i data-lucide="download" size="14"></i> ${mod.downloads}</span>
                        <span class="stat-item"><i data-lucide="star" size="14"></i> ${mod.rating}</span>
                    </div>
                    <button class="btn-download"><i data-lucide="eye" size="14"></i> Xem Chi Tiết</button>
                </div>
            `;

            // Lắng nghe sự kiện nhấp để mở Pop-up
            card.addEventListener("click", () => openModal(mod));
            modsGrid.appendChild(card);
        });

        lucide.createIcons();
    }

    // Mở Pop-up
    function openModal(mod) {
        modalImg.src = mod.image;
        modalTitle.innerText = mod.title;
        modalCategory.innerText = mod.category;
        modalVersion.innerText = mod.version;
        modalDesc.innerText = mod.description;
        modalDownloadLink.href = mod.downloadUrl || "#";

        // Render các bước cài đặt
        modalSteps.innerHTML = mod.steps.map(step => `<li>${step}</li>`).join("");

        modal.classList.add("active");
        lucide.createIcons();
    }

    // Đóng Pop-up
    modalClose.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
    });

    // Tìm kiếm trực tiếp
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = modsData.filter(m => 
            m.title.toLowerCase().includes(query) ||
            m.description.toLowerCase().includes(query) ||
            m.category.toLowerCase().includes(query)
        );
        renderMods(filtered);
    });

    // Chạy khởi tạo ban đầu
    renderMods(modsData);
});
