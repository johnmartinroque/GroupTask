import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { db } from "../../../firebase";

function Graph() {
  const { groupId } = useParams();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopFinishers = async () => {
      try {
        const q = query(
          collection(db, "tasks"),
          where("groupId", "==", groupId),
          where("progress", "==", "Finished")
        );

        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map((doc) => doc.data());

        // Count how many times each user appears in `finishedBy`
        const userCounts = {};
        tasks.forEach((task) => {
          const user = task.finishedBy;
          if (user) {
            userCounts[user] = (userCounts[user] || 0) + 1;
          }
        });

        // Convert counts to an array and sort by value descending
        const sorted = Object.entries(userCounts)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => a.value - b.value) // smallest to largest
          .slice(-3); // last 3 of the sorted list (if more than 3)

        setChartData(sorted);
      } catch (err) {
        console.error("Error fetching top finishers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopFinishers();
  }, [groupId]);

  if (loading) return <Spinner animation="border" />;
  if (chartData.length === 0) return <p>No finished tasks yet to show.</p>;

  return (
    <div>
      <h5 className="mb-3">Top 3 Finishers</h5>
      <ResponsiveContainer width="50%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#82ca9d"
            label={{ position: "insideTop", fill: "#000" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
