import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/resources.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [team] = await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'A balanced team focused on steady progress and shared milestones.',
        color: '#0f766e',
        memberCount: 2,
      },
      {
        name: 'Morning Momentum',
        description: 'Early risers building consistency one workout at a time.',
        color: '#ea580c',
        memberCount: 1,
      },
    ]);

    const users = await User.insertMany([
      {
        username: 'maya.chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        bio: 'Trail runner training for her first ultra.',
        teamId: team._id,
      },
      {
        username: 'jordan.lee',
        email: 'jordan.lee@example.com',
        displayName: 'Jordan Lee',
        bio: 'Cyclist balancing strength and endurance.',
        teamId: team._id,
      },
      {
        username: 'riley.patel',
        email: 'riley.patel@example.com',
        displayName: 'Riley Patel',
        bio: 'Yoga enthusiast and mobility advocate.',
      },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id, type: 'Trail run', durationMinutes: 48, calories: 520, completedAt: new Date('2026-08-30T07:30:00Z') },
      { userId: users[1]._id, type: 'Indoor cycling', durationMinutes: 42, calories: 430, completedAt: new Date('2026-08-30T06:45:00Z') },
      { userId: users[2]._id, type: 'Vinyasa yoga', durationMinutes: 35, calories: 180, completedAt: new Date('2026-08-29T18:00:00Z') },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id, teamId: team._id, points: 1280, rank: 1, period: '2026-W35' },
      { userId: users[1]._id, teamId: team._id, points: 1125, rank: 2, period: '2026-W35' },
      { userId: users[2]._id, points: 940, rank: 3, period: '2026-W35' },
    ]);

    await Workout.insertMany([
      { title: 'Endurance Builder', focus: 'Cardio', difficulty: 'intermediate', durationMinutes: 40, exercises: ['Warm-up jog', 'Tempo intervals', 'Cool-down walk'] },
      { title: 'Strong Foundations', focus: 'Full body strength', difficulty: 'beginner', durationMinutes: 30, exercises: ['Squats', 'Push-ups', 'Dead bug', 'Plank'] },
      { title: 'Mobility Reset', focus: 'Mobility', difficulty: 'beginner', durationMinutes: 20, exercises: ['Cat-cow', "World's greatest stretch", '90/90 switches'] },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
