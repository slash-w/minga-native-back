import Chapter from "../../models/Chapter.js";

export default async (req, res) => {
  const mangaId = req.query.manga_id;

  const page = parseInt(req.query.page) || 1; // Obtener el número de página que se quiere ver o usar 1 por defecto

  const limit = 6; // Número de capítulos por página

  try {
    const totalChapters = await Chapter.countDocuments({ manga_id: mangaId });

    const totalPages = Math.ceil(totalChapters / limit);

    const chapters = await Chapter.find({ manga_id: mangaId })

      .select("-createdAt -updatedAt -__v") //SAQUE EL -MANGA-ID
      .sort({ order: 1 }) // Ordenar los capítulos por "order" de forma ascendente
      .skip((page - 1) * limit) // Saltar los capítulos anteriores a la página actual
      .limit(limit); // Limitar el número de capítulos a mostrar por página

    const response = {
        chapters: chapters,
        currentPage: page,
        totalPages: totalPages,
        totalChapters: totalChapters
    }
    
    if (page > 1) {
      response.prev = true;
      response.next = false;
    } else if (page < totalPages) {
      response.prev = false;
      response.next = true;
    }

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los capítulos" });
  }
};
