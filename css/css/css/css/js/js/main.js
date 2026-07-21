document.addEventListener("DOMContentLoaded", () => {
    // Tự động gộp Mod mặc định từ data.js và các Mod vừa Upload qua Admin
    const localMods = JSON.parse(localStorage.getItem("custom_mods")) || [];
    const allMods = [...modsData, ...localMods];

    const modsGrid = document.getElementById("mods-grid");
    const searchInput = document.getElementById("search-input");

    /* Các hàm renderMods, openModal giữ nguyên như cũ, chỉ thay `modsData` bằng `allMods` */

    // Chạy render ban đầu với allMods
    renderMods(allMods);

    // Tìm kiếm trực tiếp
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allMods.filter(m => 
            m.title.toLowerCase().includes(query) ||
            m.description.toLowerCase().includes(query) ||
            m.category.toLowerCase().includes(query)
        );
        renderMods(filtered);
    });
});
