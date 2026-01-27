const Joi = require('joi');

/**
 * Centralized validation schemas for all API endpoints
 */

const validationSchemas = {
  // Auth Schemas
  register: Joi.object({
    fullName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).max(50).required(),
    role: Joi.string().valid('admin', 'manager', 'employee').default('employee')
  }),

  login: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required()
  }),

  // Task Schemas
  createTask: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500),
    assignedTo: Joi.string().hex().length(24).required(),
    priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
    dueDate: Joi.date().min('now')
  }),

  updateTaskStatus: Joi.object({
    status: Joi.string().valid('pending', 'in_progress', 'completed').required()
  }),

  // Leave Schemas
  applyLeave: Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
    reason: Joi.string().min(5).max(500).required()
  }),

  approveLeave: Joi.object({
    status: Joi.string().valid('approved', 'rejected').required(),
    reviewNotes: Joi.string().max(500)
  }),

  // Skill Schemas
  updateSkills: Joi.object({
    skills: Joi.array().items(
      Joi.object({
        name: Joi.string().min(2).max(50).required(),
        level: Joi.number().min(1).max(5).required()
      })
    ).required()
  }),

  // Salary Schemas
  createSalary: Joi.object({
    employee: Joi.string().hex().length(24).required(),
    month: Joi.string().pattern(/^\d{4}-\d{2}$/).required(),
    basic: Joi.number().positive().required(),
    allowances: Joi.number().min(0).default(0),
    deductions: Joi.number().min(0).default(0)
  }),

  // ML Service Schemas
  predictProductivity: Joi.object({
    tasks_total: Joi.number().min(0).required(),
    tasks_completed: Joi.number().min(0).required(),
    leave_count: Joi.number().min(0).required(),
    skills_count: Joi.number().min(0).required()
  }),

  predictBurnout: Joi.object({
    avg_tasks_per_week: Joi.number().min(0).required(),
    leave_frequency: Joi.number().min(0).required(),
    productivity_trend: Joi.number().min(-100).max(100).required(),
    overdue_task_ratio: Joi.number().min(0).max(1).required()
  }),

  detectAnomaly: Joi.object({
    current_productivity: Joi.number().min(0).max(100).required(),
    historical_avg_productivity: Joi.number().min(0).max(100).required(),
    overdue_task_ratio: Joi.number().min(0).max(1).required()
  }),

  generateInsights: Joi.object({
    productivity_score: Joi.number().min(0).max(100).required(),
    burnout_risk: Joi.string().valid('low', 'medium', 'high').required(),
    leave_frequency: Joi.number().min(0).required()
  })
};

/**
 * Validate request body against schema
 */
function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    req.body = value;
    next();
  };
}

/**
 * Validate URL parameters
 */
function validateParams(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Parameter validation failed',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    req.params = value;
    next();
  };
}

module.exports = {
  validationSchemas,
  validateRequest,
  validateParams
};
