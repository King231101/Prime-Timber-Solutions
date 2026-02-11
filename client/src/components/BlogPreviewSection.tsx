import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const posts = [
  {
    title: "The Real Implications of Switching to Digital Trip Tickets in Forestry",
    category: "Harvest Ops",
    date: "Dec 10, 2025",
    image: "/images/stacked-logs.png",
  },
  {
    title: "How Real-Time Visibility is Transforming Timber Supply Chains",
    category: "Supply Chain",
    date: "Nov 28, 2025",
    image: "/images/timber-truck.png",
  },
  {
    title: "Meeting EUDR Compliance Requirements with Digital Load Tracking",
    category: "Compliance",
    date: "Nov 15, 2025",
    image: "/images/timber-mill.png",
  },
];

export default function BlogPreviewSection() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-20" data-testid="blog-preview-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-orange-500 mb-3 block">
              Latest Articles
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              data-testid="text-blog-title"
            >
              Product Updates, Features, and{" "}
              <span className="text-orange-600">Thoughts on the Timber Industry</span>
            </h2>
          </div>
          <Link href="/resources/blog">
            <Button variant="outline" className="font-semibold" data-testid="button-read-posts">
              Read Posts
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-visible group cursor-pointer h-full hover-elevate" data-testid={`card-blog-${i}`}>
                <div className="relative overflow-hidden rounded-t-md">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-orange-500">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">
                    {post.title}
                  </h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
