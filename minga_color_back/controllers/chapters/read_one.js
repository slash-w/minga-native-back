import Chapter from "../../models/Chapter.js";

const readOneController = async (req, res) => {
  try {
    const mangaId = req.query.manga_id;
    const chapterId = req.params.id;
    const page = parseInt(req.query.page) || 1; // obtiene  numero de pagina que se quiere ver o usa 1 por defecto
    const limit = 6; // Número de capítulos por página
    // console.log(mangaId, chapterId, "ASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    // Aquí puedes realizar las validaciones y proteger los datos necesarios

    // Implementar passport aquí si deseas autenticación
    // passport.authenticate("jwt", { session: false }, async (err, user) => {
    //   if (err || !user) {
    //     // Unauthorized or error occurred
    //     res.status(401).json({ error: "Unauthorized" });
    //     return;
    //   }

    // Obtener el número total de capítulos
    // const totalChapters = await Chapter.countDocuments({ manga_id: mangaId });

    // Calcular el número total de páginas
    // const totalPages = Math.ceil(totalChapters / limit);

    // Obtener los capítulos de la página actual
    const chapter = await Chapter.find({ manga_id: mangaId, _id: chapterId });
    // .select("-_id -manga_id -pages ")
    // .sort({ order: 1 }) // Ordenar los capítulos por "order" de forma ascendente
    // .skip((page - 1) * limit); // Saltar los capítulos anteriores a la página actual
    // .limit(limit); // Limitar el número de capítulos a mostrar por página

    const nextChapter = await Chapter.findOne({
      manga_id: mangaId,
      order: chapter[0].order + 1,
    });
    const responseData = {
      title: chapter[0].title,
      pages: chapter[0].pages,
      mangaId: chapter[0].manga_id,
    };
    console.log(chapter, "responsedata");
    if (!nextChapter) {
      res.status(200).json({ chapter: responseData, nextChapter: null });
    }

    res.status(200).json({ chapter: responseData, nextChapter: nextChapter._id });

    // , nextChapter: nextChapter._id
    // })(req, res);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error });
  }
};

export default readOneController;
