import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, phone, email, password } = body

    if (!fullName || !phone || !email) {
      return NextResponse.json(
        { error: 'Full name, phone number, and email are required' },
        { status: 400 }
      )
    }

    const newUser = {
      fullName,
      email,
      phone,
      addressList: [
        {
          addressLabel: 'Primary Address',
          street: 'Block H3, Johar Town',
          city: 'Lahore',
          postalCode: '54770',
        },
      ],
      activeSubscription: {
        packageType: 'Family Plan (19L)',
        frequency: 'weekly',
        bottleQty: 4,
        status: 'active',
      },
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: newUser,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Signup error' },
      { status: 500 }
    )
  }
}
