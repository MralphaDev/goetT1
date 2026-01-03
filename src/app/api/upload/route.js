// app/api/upload/route.js

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: "No file uploaded" }),
        { status: 400 }
      );
    }

    // 构造新的 FormData 转发给 Hostinger 的 PHP
    const hostingerForm = new FormData();
    hostingerForm.append("file", file, file.name);

    // 注意这里是你的完整 PHP 地址
    const res = await fetch("https://goetvalves.eu/api-goet/upload.php", {
      method: "POST",
      body: hostingerForm,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Hostinger PHP error:", errorText);
      return new Response(
        JSON.stringify({ error: "Upload failed on server" }),
        { status: 500 }
      );
    }

    const data = await res.json();

    if (data.url) {
      return new Response(JSON.stringify({ url: data.url }), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ error: data.error || "Unknown error from server" }),
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Next.js upload route error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

// 关键：关闭 Next.js 默认的 bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};