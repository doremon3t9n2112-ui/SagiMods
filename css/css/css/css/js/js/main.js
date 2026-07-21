document.addEventListener("DOMContentLoaded", () => {
    const modsGrid = document.getElementById("mods-grid");
    const searchInput = document.getElementById("search-input");

    // Hàm render danh sách Mod lên giao diện
    function renderMods(items) {
        modsGrid.innerHTML = ""; // Xóa dữ liệu cũ
        
        if (items.length === 0) {
            modsGrid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">Không tìm thấy Mod phù hợp.</p>`;
            return;
        }

        items.forEach(mod => {
            const cardHTML = `
                <div class="card">
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
                        <button class="btn-download"><i data-lucide="download" size="14"></i> Tải về</button>
                    </div>
                </div>
            `;
            modsGrid.insertAdjacentHTML("beforeend", cardHTML);
        });

        // Khởi tạo lại icons sau khi render HTML mới
        lucide.createIcons();
    }

    // Lần đầu tải trang
    renderMods(modsData);

    // Tìm kiếm thời gian thực (Live Search)
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filteredMods = modsData.filter(mod => 
            mod.title.toLowerCase().includes(query) || 
            mod.description.toLowerCase().includes(query) ||
            mod.version.toLowerCase().includes(query)
        );
        renderMods(filteredMods);
    });
});
